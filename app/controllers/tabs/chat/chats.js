function doOpen() {
  Alloy.Collections.chats.reset(require('data/chats').sort((a, b) => b.timestamp.localeCompare(a.timestamp)))
}

function doClick(e) {
  Alloy.Globals.tabGroup.activeTab.open(Alloy.createController('/tabs/chat/chat', getAttributes(e.itemIndex)).getView())
}

function getAttributes(itemIndex) {
  return Alloy.Collections.chats.models[itemIndex].attributes
}

function transformChats(model) {
  model = model.toJSON()
  model.message = (model.type === 'sent') ? `You: ${model.message}` : `${model.nickname}: ${model.message}`
  model.time = new Date(model.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return model
}
