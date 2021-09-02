let todoItems = []
function onAdd () {
  const todoText = $("#newTodoTextfield").val()
  const todoIsDone = $("#newTodoCheckbox").is(':checked')
  const todoItem = { 
    "text": todoText, 
    "isDone": todoIsDone
  }

  if (!todoText) {
    alert("Empty to-do text, please add message.")
    return
  }

  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "api/todos",
    data: JSON.stringify(todoItem)
  }).always(function(data) {
    if (data != "Invalid") {
      clearNewTodoItem()
      todoItems.push(data)
      renderTodoItems()
    }
  })
}

function onDelete (id) {
  todoItems = todoItems.filter(item => item.id != id)
  $.ajax({
    type: "DELETE",
    contentType: "application/json",
    url: "api/todos",
    data: JSON.stringify({ id })
  }).always(function(data) {
    if (data == "Deleted") {
      $("#" + id).remove()
    }
  })
}

function onTick (item) {
  item.isDone = !item.isDone
  $.ajax({
    type: "PUT",
    contentType: "application/json",
    url: "api/todos/" + item.id,
    data: JSON.stringify(item)
  })
}

function fetchTodoItems () {
  $.get("api/todos", function(data) {
    todoItems = data
    renderTodoItems()
  })
}

function clearTodoItems () {
  $(".todo-list").empty()
}

function clearNewTodoItem () {
  $("#newTodoTextfield").val("")
  $("#newTodoCheckbox").prop('checked', false)
}

function renderTodoItems () {
  clearTodoItems()
  for (const item of todoItems) {
    const $itemNode = createTodoItemNode(item)
    $(".todo-list").append($itemNode)
  }
}

function createTodoItemNode (item) {
  const todoItem = document.createElement("div")
  todoItem.id=item.id
  todoItem.classList = ["todo-item"]
  const $todoItem = $(todoItem)

  const checkBox = document.createElement("checkbox")
  checkBox.classList = ["checkbox"]
  const $checkBox = $(checkBox)

  const inputCheckbox = document.createElement("input")
  inputCheckbox.type = "checkbox"
  inputCheckbox.checked = item.isDone
  inputCheckbox.onclick = function () {
    onTick(item)
  }

  const $inputCheckbox = $(inputCheckbox)
  $checkBox.append($inputCheckbox)

  const content = document.createElement("div")
  content.classList = ["content"]
  content.innerHTML = item.text
  const $content = $(content)

  const button = document.createElement("button")
  button.classList = ["ui button red"]
  button.innerHTML = "-"
  button.onclick = function () {
    onDelete(item.id)
  }
  const $button = $(button)

  $todoItem.append($checkBox)
  $todoItem.append($content)
  $todoItem.append($button)

  return $todoItem
}
