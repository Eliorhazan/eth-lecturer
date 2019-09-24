App = {
    loading: false,
    contracts: {},
  
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    },
  
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
  
    loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0]
    },
    getGrade: async()=>{
      const id = $('#idStudent').val()
      const Student = await App.lecturer.Students(id)
      const grade = Student[2]
      if(grade==0){
        window.alert("student not exist")
      }else
      window.alert("your grade is:"+grade)
    },
    get:async() =>{
      //await App.lecturer.getAvg();
      const avg = await App.lecturer.getAvg()
      window.alert("student average:" + avg);
     
    },
    update: async () =>{
      const studentId = $('#idStudent').val()
      const studentName =$('#StudentName').val()
      const studentGrade = $('#studentGrade').val()
      await App.lecturer.update(studentId,studentName,studentGrade)
      window.alert('student added!!!')
      
    },
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const lecturer = await $.getJSON('lecturer.json')
      App.contracts.lecturer = TruffleContract(lecturer)
      App.contracts.lecturer.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.lecturer = await App.contracts.lecturer.deployed()
    },
    addStudent: async ()=>{
        //window.alert(await App.lecturer.studentcount().toNumber());
        const studentId = $('#idStudent').val()
        const studentName =$('#StudentName').val()
        const studentGrade = $('#studentGrade').val()
        await App.lecturer.addStudent(studentId,studentName,studentGrade)
        App.alert("student added successfully to blockchain");
        //App.setLoading(true)
    },


    render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }

      // Render Account
      $('#account').html(App.account)

    },
    chengeDiv:()=>{
      $('#lectorerLoader').hide()
      $('#getAvg').hide()
      $('#addStudent').show()
    },
    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#lectorerLoader')
      const content = $('#addStudent')
      
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
  }
  
  $(() => {
    $(window).load(() => {
      App.load()
    })
  })