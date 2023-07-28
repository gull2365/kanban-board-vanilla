window.onload = () => {
  let data = [];
  let selectedId = null;

  const generlateUUID = () => {
    return Math.floor(Math.random() * 100000001).toString();
  };

  const removeCard = (e) => {
    const {
      dataset: { id },
    } = e.target;

    data = data.filter((item) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(data));
    reload();
  };

  const openModifyCardModal = (e) => {
    const {
      dataset: { id },
    } = e.target;
    const {
      title = "",
      startAt = "",
      endAt = "",
      status = "TODO",
      content = "",
    } = data.find((item) => item.id === id);

    document.getElementById("title").value = title;
    document.getElementById("startAt").value = startAt;
    document.getElementById("endAt").value = endAt;
    document.getElementById("status").value = status;
    document.getElementById("content").value = content;

    selectedId = id;

    document.getElementById("modifyModal").classList.add("on");
  };

  const closeModifyCardModal = (e) => {
    document.getElementById("modifyModal").classList.remove("on");
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    data = data.map((item) => {
      if (item.id === selectedId) {
        return {
          ...item,
          [name]: value,
        };
      }

      return item;
    });
    localStorage.setItem("data", JSON.stringify(data));

    reload();
  };

  const drawCard = ({ id, title = "" }) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "cardTitle");
    input.setAttribute("id", "cardTitle");
    input.setAttribute("placeholder", "내용을 입력해주세요");
    input.setAttribute("value", title);
    input.addEventListener("change", (e) => {
      const { value } = e.target;
      data = data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: value,
          };
        }

        return item;
      });
      localStorage.setItem("data", JSON.stringify(data));
      reload();
    });
    card.appendChild(input);

    const btnList = document.createElement("div");

    const modifyBtn = document.createElement("button");
    modifyBtn.innerText = "수정";
    modifyBtn.dataset.id = id;
    console.log(id);
    modifyBtn.addEventListener("click", openModifyCardModal);
    btnList.prepend(modifyBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "삭제";
    deleteBtn.dataset.id = id;
    deleteBtn.addEventListener("click", removeCard);
    btnList.prepend(deleteBtn);

    card.appendChild(btnList);

    return card;
  };

  const reset = () => {
    const todoCards = document
      .getElementById("todo")
      .getElementsByClassName("card");
    Array.from(todoCards).map((card) => card.remove());

    const inProgressCards = document
      .getElementById("inProgress")
      .getElementsByClassName("card");
    Array.from(inProgressCards).map((card) => card.remove());

    const doneCards = document
      .getElementById("done")
      .getElementsByClassName("card");
    Array.from(doneCards).map((card) => card.remove());
  };

  const reload = () => {
    console.log("Reload...");
    reset();

    const todo = document.getElementById("todo");
    (data || [])
      .filter((item) => item.status === "TODO")
      .map((todoItem) => todo.prepend(drawCard(todoItem)));

    const inProgress = document.getElementById("inProgress");
    (data || [])
      .filter((item) => item.status === "IN_PROGRESS")
      .map((inProgressItem) => inProgress.prepend(drawCard(inProgressItem)));

    const done = document.getElementById("done");
    (data || [])
      .filter((item) => item.status === "DONE")
      .map((doneItem) => done.prepend(drawCard(doneItem)));
  };

  const addTodoCard = (e) => {
    const initData = {
      id: generlateUUID(),
      title: "",
      status: "TODO",
      startAt: "",
      endAt: "",
    };
    data.push(initData);
    localStorage.setItem("data", JSON.stringify(data));

    reload();
  };

  const addInProgressCard = (e) => {
    const initData = {
      id: generlateUUID(),
      title: "",
      status: "IN_PROGRESS",
      startAt: "",
      endAt: "",
    };
    data.push(initData);
    localStorage.setItem("data", JSON.stringify(data));

    reload();
  };

  const addDoneCard = (e) => {
    const initData = {
      id: generlateUUID(),
      title: "",
      status: "DONE",
      startAt: "",
      endAt: "",
    };
    data.push(initData);
    localStorage.setItem("data", JSON.stringify(data));

    reload();
  };

  const init = () => {
    try {
      data = JSON.parse(localStorage.getItem("data")) || [];
    } catch (e) {
      data = [];
    }
    reload();
  };

  init();

  document.getElementById("addTodoBtn").addEventListener("click", addTodoCard);
  document
    .getElementById("addInPorgressBtn")
    .addEventListener("click", addInProgressCard);
  document.getElementById("addDoneBtn").addEventListener("click", addDoneCard);
  document
    .getElementById("modifyModalCloseBtn")
    .addEventListener("click", closeModifyCardModal);
  document.getElementById("title").addEventListener("change", handleData);
  document.getElementById("startAt").addEventListener("change", handleData);
  document.getElementById("endAt").addEventListener("change", handleData);
  document.getElementById("status").addEventListener("change", handleData);
  document.getElementById("content").addEventListener("change", handleData);
};
