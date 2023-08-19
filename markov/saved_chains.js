// Load the saved content from localStorage on page load
window.addEventListener('load', function() {
    var savedContent = localStorage.getItem('savedContent');
    if (savedContent) {
      document.getElementById('saved').innerHTML = savedContent;
    }
});

var button = document.getElementById("saveButton");
button.addEventListener("onClick", saveChain)

function saveChain() {
    var chainContent = document.getElementById("chain").textContent;
    document.getElementById("saved").innerHTML += chainContent + "\n";

    // Save the updated content to localStorage
    localStorage.setItem('savedContent', document.getElementById("saved").innerHTML);
};