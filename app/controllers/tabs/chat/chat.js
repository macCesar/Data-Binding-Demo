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

// ! Response Simulator
const sender = messages[0].sender

const groupMembers = [ ...new Set(messages
  .filter(msg => msg.type === 'received')
  .map(msg => JSON.stringify(msg.sender))) ]
  .map(str => JSON.parse(str))

let someResponses = [
  'Adieu and take care.',
  'Bye for now.',
  'Catch you later.',
  'Cheers to more enlightening conversations!',
  'Don\'t be a stranger!',
  'Farewell, my friend.',
  'Fingers crossed for a bright future.',
  'Goodbye and have a great day.',
  'Goodbye for now.',
  'Hasta la vista, baby!',
  'Have a good day/night.',
  'Have a wonderful day.',
  'Here\'s to new beginnings!',
  'I hope to talk to you again soon.',
  'I\'ll be in touch.',
  'I\'m glad we had this chat.',
  'I\'ve enjoyed our conversation.',
  'It\'s been great talking with you.',
  'Keep smiling and stay positive!',
  'May our paths cross again soon.',
  'May the stars guide your way.',
  'Parting is such sweet sorrow.',
  'Safe travels on your journey.',
  'See you around.',
  'See you later.',
  'Sending you good vibes and positivity.',
  'Stay awesome and be amazing!',
  'Take a deep breath and relax.',
  'Take a moment to enjoy life.',
  'Take care and stay safe.',
  'Take care.',
  'Take it easy.',
  'Talk to you soon.',
  'Thank you for chatting with me.',
  'Till we meet again.',
  'To infinity and beyond!',
  'Until next time.',
  'Until our next rendezvous.',
  'Wishing you a fantastic day ahead!'
]

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
