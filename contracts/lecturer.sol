pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract lecturer{
    uint public studentCount=0;
    uint public average = 0 ;
    address owner;
    mapping (uint  => Student) public  Students;
    mapping (uint => uint) public grades;
    struct Student{    
        uint id;
        string name;
        uint grade;
    }
    constructor()public{
        owner = msg.sender;

    }
    modifier onlyowner(){
       require(msg.sender == owner);
       _;
    }
    function addStudent(uint  _id,string memory _name,uint _grade) public onlyowner{
        Students[_id] = Student(_id,_name,_grade);
        grades[studentCount] = Students[_id].grade;
        studentCount++;
    }
    function getAvg() view public returns(uint){
        uint sum = 0;
        for(uint i = 0; i<studentCount; i++){
             sum += grades[i];
        }

        return sum/studentCount;
    }
    function update(uint  _id,string memory _name,uint _grade)public onlyowner{
        Students[_id] = Student(_id,_name,_grade);
    }
}