// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "solidity-string-utils/StringUtils.sol";

contract SCM {

// Entity Definition----------------------------

  struct Record {
    address id;
    uint256 timeAdded;
    string fileName;
    string ipfsHash;
  }

  struct Drug {
    string id;
    string name;
    Record[] records;
  }

  struct User {
    address id;
    string name;
    string role;
    string[] drugId;
  }

  struct UserDrugRecord {
    address userId;
    string userName;
    string userRole;
    string drugId;
    string drugName;
    uint256 timeAdded;
    string fileName;
    string ipfsHash;
  }

// MAPPINGS----------------------------------------------

  mapping (address => Record) public records;
  mapping (string => Drug) public drugs;
  mapping (address => User) public users;

// -----------------------------------------------------

// EVENTS-----------------------------------------------

  event DrugAdded(string id, string role, Record[] records);
  event UserAdded(address user);
  event RecordAdded(address userId, string drugId, string ipfsHash);
  
// ----------------------------------------------------

// MODIFIERS-------------------------------------------


  modifier senderIsUser {
    require(users[msg.sender].id == msg.sender, "Sender is not authorized.");
    _;
  }

// ----------------------------------------------------------

// FUNCTIONS-------------------------------------------------

  function addUser(string memory _name, string memory _role) public {
    require(users[msg.sender].id != msg.sender, "This Entity already exists.");
    User memory user = User(msg.sender, _name, _role, new string[] (0));
    users[msg.sender] = user;
    emit UserAdded(msg.sender);
  }

  function getSenderRole(address _id) public view returns (string memory) {
    return users[_id].role;
  }

  function getUserName(address _id) public view returns (string memory) {
    return users[_id].name;
  }

  function checkUserExists(address _userId) public view returns(bool) {
    return users[_userId].id == _userId;
  }

  function checkDrugExists(string memory _drugId) public view returns(bool) {
    return StringUtils.equal(drugs[_drugId].id, _drugId);
  }

  function copyToStorage(string memory _id, Record[] memory data) public {
      for (uint i = 0; i < data.length; i++) {
          drugs[_id].records.push(data[i]);
      }
  }

  function addDrug(string memory _id, string memory _name, string memory _fileName, string memory _ipfsHash) public senderIsUser {

    Record memory record = Record(msg.sender, block.timestamp, _fileName, _ipfsHash);
    
    if(!StringUtils.equal(drugs[_id].id, _id)) {
      Record[] memory temp = new Record[](1);
      temp[0] = record;
      copyToStorage(_id, temp);
      drugs[_id].id = _id;
      drugs[_id].name = _name;
    } else {
      drugs[_id].records.push(record);
    }

    users[msg.sender].drugId.push(_id);
    
    emit DrugAdded(_id, getSenderRole(msg.sender), drugs[_id].records);
  }

  function getDrugRecord(string memory _id) public view returns(UserDrugRecord[] memory) {

    Drug[] memory drugsList = new Drug[](1);
    drugsList[0] = drugs[_id];

    uint256 userCount = drugs[_id].records.length;
    UserDrugRecord[] memory list = new UserDrugRecord[](userCount);

    for(uint256 i = 0; i < userCount; i++) {
      list[i].userId = drugs[_id].records[i].id;
      list[i].userName = users[drugs[_id].records[i].id].name;
      list[i].userRole = users[drugs[_id].records[i].id].role;
      list[i].drugId = _id;
      list[i].drugName = drugs[_id].name;
      list[i].timeAdded = drugs[_id].records[i].timeAdded;
      list[i].fileName = drugs[_id].records[i].fileName;
      list[i].ipfsHash = drugs[_id].records[i].ipfsHash;
    }

    return list;
  }

  function getDrugsListFromUser(address _id) public view returns(Drug[] memory) {

    uint256 drugCount = users[_id].drugId.length;
    Drug[] memory drugsList = new Drug[](drugCount);

    for(uint256 i = 0; i < drugCount; i++) {
      drugsList[i] = drugs[users[_id].drugId[i]];
      drugsList[i].name = drugs[users[_id].drugId[i]].name;
    }

    return drugsList;
  }

}

