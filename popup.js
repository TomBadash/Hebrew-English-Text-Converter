const engToHebMap = {
    'q': '/', 'w': "'", 'e': 'ק', 'r': 'ר', 't': 'א', 'y': 'ט', 'u': 'ו', 'i': 'ן', 'o': 'ם', 'p': 'פ',
    'a': 'ש', 's': 'ד', 'd': 'ג', 'f': 'כ', 'g': 'ע', 'h': 'י', 'j': 'ח', 'k': 'ל', 'l': 'ך',
    'z': 'ז', 'x': 'ס', 'c': 'ב', 'v': 'ה', 'b': 'נ', 'n': 'מ', 'm': 'צ',
    ',': 'ת', '.': 'ץ',';':'ף'
};

const hebToEngMap = Object.fromEntries(
    Object.entries(engToHebMap).map(([key, value]) => [value, key])
);

function convertText(text, conversionMap) {
    return text.split('').map(char => conversionMap[char.toLowerCase()] || char).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    const conversionDirection = document.getElementById('conversionDirection');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const convertButton = document.getElementById('convertButton');
    const copyButton = document.getElementById('copyButton');

    function performConversion() {
        const direction = conversionDirection.value;
        const input = inputText.value;
        
        if (direction === 'engToHeb') {
            outputText.value = convertText(input, engToHebMap);
        } else {
            outputText.value = convertText(input, hebToEngMap);
        }
    }

    // Convert on button click
    convertButton.addEventListener('click', performConversion);

    // Convert on input change (for real-time conversion)
    inputText.addEventListener('input', performConversion);

    // Copy to clipboard functionality
    copyButton.addEventListener('click', function() {
        outputText.select();
        document.execCommand('copy');
        
        // Visual feedback
        copyButton.textContent = 'Copied!';
        copyButton.classList.remove('bg-green-500', 'hover:bg-green-600');
        copyButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
        
        setTimeout(() => {
            copyButton.textContent = 'Copy to Clipboard';
            copyButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');
            copyButton.classList.add('bg-green-500', 'hover:bg-green-600');
        }, 2000);
    });

    // Initial conversion on load
    performConversion();
});
