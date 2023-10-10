import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [currentSplitReq, setCurrentSplitReq] = useState("");
  return (
    <div className="app">
      <FriendList
        onCurrentSplitReq={setCurrentSplitReq}
        currentSplitReq={currentSplitReq}
        friendList={friendList}
        onSetFriendList={setFriendList}
      />
      {currentSplitReq !== "" ? (
        <SplitForm
          currentSplitReq={currentSplitReq}
          onCurrentSplitReq={setCurrentSplitReq}
          friendList={friendList}
          onSetFriendList={setFriendList}
        />
      ) : null}
    </div>
  );
}

function SplitForm({
  currentSplitReq,
  onCurrentSplitReq,
  friendList,
  onSetFriendList,
}) {
  const [billValue, setBillValue] = useState(0);
  const [myExpense, setMyExpense] = useState(0);
  const [isYouPay, setIsYouPay] = useState(0);

  function handleSplitBill(e) {
    e.preventDefault();
    const slicedFriendList = friendList.slice();
    const friendExpense = billValue - myExpense;

    if (slicedFriendList && slicedFriendList.length > 0) {
      slicedFriendList.forEach((friend) => {
        if (friend.name === currentSplitReq) {
          if (isYouPay) {
            friend.balance += friendExpense;
          } else {
            friend.balance -= friendExpense;
          }
        }
      });
    }
    onSetFriendList(slicedFriendList);
    onCurrentSplitReq("");
  }

  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {currentSplitReq}</h2>
      <span>Bill value</span>
      <input
        type="number"
        onChange={(e) => setBillValue(Number(e.target.value))}
      ></input>
      <span>Your expense</span>
      <input
        type="number"
        onChange={(e) => setMyExpense(Number(e.target.value))}
      ></input>
      <span>{currentSplitReq}'s expense</span>
      <input type="number" value={billValue - myExpense}></input>
      <span>Who is paying the bill?</span>
      <select onChange={(e) => setIsYouPay(e.target.value === "you")}>
        <option value="you">You</option>
        <option value={currentSplitReq}>{currentSplitReq}</option>
      </select>
      <button className="button" onClick={handleSplitBill}>
        Split bill
      </button>
    </form>
  );
}

function FriendList({
  onCurrentSplitReq,
  currentSplitReq,
  friendList,
  onSetFriendList,
}) {
  const [isAddFriend, setIsAddFriend] = useState(false);
  const [currFriendName, setCurrFriendName] = useState("");
  const [currFriendURL, setCurrFriendURL] = useState("");

  function handleAddFriend() {
    if (currFriendName === "" || currFriendURL === "") return;
    const friends = friendList.slice();
    friends.push({
      name: currFriendName,
      image: currFriendURL,
      balance: 0,
      id: Date.now(),
    });
    onSetFriendList(friends);
    setCurrFriendName("");
    setCurrFriendURL("");
    setIsAddFriend(false);
  }

  return (
    <div className="sidebar">
      <ul>
        {friendList.map((e) => {
          return (
            <FriendItem
              key={e.id}
              image={e.image}
              name={e.name}
              balance={e.balance}
              onCurrentSplitReq={onCurrentSplitReq}
              currentSplitReq={currentSplitReq}
            />
          );
        })}
      </ul>
      {isAddFriend ? (
        <>
          <form className="form-add-friend">
            <span>Friend name</span>
            <input
              type="text"
              onChange={(e) => setCurrFriendName(e.target.value)}
            ></input>
            <span>Image URL</span>
            <input
              type="text"
              onChange={(e) => setCurrFriendURL(e.target.value)}
            ></input>
            <button className="button" onClick={handleAddFriend}>
              Add
            </button>
          </form>
          <button className="button" onClick={() => setIsAddFriend(false)}>
            Close
          </button>
        </>
      ) : (
        <button className="button" onClick={() => setIsAddFriend(true)}>
          Add friend
        </button>
      )}
    </div>
  );
}

function FriendItem({
  image,
  name,
  balance,
  onCurrentSplitReq,
  currentSplitReq,
}) {
  const isCurrentReq = currentSplitReq === name;
  let balanceInfo;
  let style = "";
  if (balance > 0) {
    balanceInfo = `${name} owes you ${Math.abs(Number(balance))}$`;
    style = "green";
  } else if (balance < 0) {
    balanceInfo = `You owe ${name} ${Math.abs(Number(balance))}$`;
    style = "red";
  } else {
    balanceInfo = `You and ${name} are even`;
  }

  return (
    <li className={isCurrentReq ? "selected" : null}>
      <img src={image} alt="" />
      <h3>{name}</h3>
      <p className={style}>{balanceInfo}</p>
      {isCurrentReq ? (
        <button className="button" onClick={() => onCurrentSplitReq("")}>
          Close
        </button>
      ) : (
        <button className="button" onClick={() => onCurrentSplitReq(name)}>
          Select
        </button>
      )}
    </li>
  );
}

export default App;
