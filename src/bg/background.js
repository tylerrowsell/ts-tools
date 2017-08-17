chrome.commands.onCommand.addListener((command) => {
  try {
    runScript(command);
  } catch (error) {
    alert(`No action available for ${command}`);
  }
});

function runScript(name) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.executeScript(tabs[0].id, {file: `/src/actions/${name}.js`});
  });
}