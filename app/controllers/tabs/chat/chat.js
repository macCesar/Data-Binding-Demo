let messages = require($.args.messages)

function doOpen() {
  Alloy.Collections.chat.reset(messages)
  scrollChatToBottom(false)
}

function doClose() {
  $.destroy()
}

function closeWindow() {
  $.getView().close()
}

function scrollChatToBottom(animated = true) {
  $.chatView.scrollToItem(0, Number($.chatView.sections[0].items.length - 1), { animated })
}

// ! Response Simulator
const sender = messages[0].sender

const groupMembers = [ ...new Set(messages
  .filter(msg => msg.type === 'received')
  .map(msg => JSON.stringify(msg.sender))) ]
  .map(str => JSON.parse(str))

let someResponses = [
  'Bye for now.',
  'Catch you later.',
  'Goodbye and have a great day.',
  'Goodbye for now.',
  'Have a good day/night.',
  'Have a wonderful day.',
  'I hope to talk to you again soon.',
  'I\'ll be in touch.',
  'I\'m glad we had this chat.',
  'I\'ve enjoyed our conversation.',
  'It\'s been great talking with you.',
  'See you around.',
  'See you later.',
  'Take care and stay safe.',
  'Take care.',
  'Take it easy.',
  'Talk to you soon.',
  'Thank you for chatting with me.',
  'Until next time.'
]

function sendMessage() {
  let message = $.message.value.trim()
  if (message) {
    $.message.value = ''

    Alloy.Collections.chat.add(new Backbone.Model({
      sender,
      message,
      type: 'sent',
      timestamp: new Date().toISOString()
    }))

    scrollChatToBottom()

    responseSimulator()
  }
}

function randomResponse() {
  return _.shuffle(someResponses)[0]
}

function responseSimulator() {
  _.each(groupMembers, sender => {
    let individualMessage = new Backbone.Model({
      sender,
      message: '...',
      type: 'received',
      timestamp: new Date().toISOString()
    })

    setTimeout(() => {
      Alloy.Collections.chat.add(individualMessage)
      scrollChatToBottom()

      let message = randomResponse()
      setTimeout(() => {
        individualMessage.set({ message })
        scrollChatToBottom()
      }, 125 * message.length)
    }, 1000 * (Math.floor(Math.random() * 8)))
  })
}
