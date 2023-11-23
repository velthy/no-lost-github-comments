let isContentEdited = false;

function checkTextAreaContent() {
    var textArea = document.querySelector('#new_comment_field');
    if (textArea) {
        isContentEdited = textArea.value && textArea.value.length > 10;
        console.log('Textarea checked. isContentEdited:', isContentEdited); // Debugging log
    }
}

function attachListenerToTextArea() {
    var textArea = document.querySelector('#new_comment_field');
    if (textArea) {
        textArea.addEventListener('input', checkTextAreaContent);
        console.log('Listener attached to textarea'); // Debugging log
    }
}

// Initial check and listener attachment
checkTextAreaContent();
attachListenerToTextArea();

window.addEventListener('beforeunload', function (e) {
    if (isContentEdited) {
        var confirmationMessage = 'It looks like you have been editing something. If you leave before saving, your changes will be lost.';
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }
});

// MutationObserver for dynamically added textarea (if needed)
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            attachListenerToTextArea();
            checkTextAreaContent();
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
