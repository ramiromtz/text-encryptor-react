import './App.css';
import React, { useState } from 'react';

function App() {

  const [text, setText] = useState('');
  const [encryptionKey, setEncryptionKey] = useState(1);
  const [encryptedText, setEncryptedText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lets check if the text isnt empty
    if(text === '') {
      alert('Please enter some text');
      return false;
    }

    // Lets check if the encryption key isnt NaN
    if(!isNaN(encryptionKey) && encryptionKey > 0) {
      let result = encrypt(text, encryptionKey);
      setEncryptedText(result);
    } else {
      alert('Encryption key must be a number and greater than 0');
    }
  }
  /**
   * Encrypts a given text using the provided encryption key.
   *
   * @param {string} text - The text to be encrypted.
   * @param {number} key - The encryption key used to shift the characters.
   * @return {string} The encrypted text.
   */
  function encrypt(text, key) {
    let encryptedText = "";

    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      if (char.match(/[a-z]/i)) { // if the character is a letter
        const isUpperCase = char === char.toUpperCase(); // check if the character is uppercase
        char = char.toLowerCase(); // convert the character to lowercase
        const charCode = char.charCodeAt(0); // get the ASCII code of the character
        const shiftedCharCode = ((charCode - 97 + key) % 26) + 97; // shift the ASCII code by the encryption key

        if (isUpperCase) { // if the character is uppercase
          encryptedText += String.fromCharCode(shiftedCharCode).toUpperCase(); // convert the shifted ASCII code to uppercase and add it to the encrypted text
        } else {
          encryptedText += String.fromCharCode(shiftedCharCode); 
        } 
      } else {
        encryptedText += char;
      }
    }

    return encryptedText;
  }

  // Function to copy the encrypted text to the clipboard
  /**
   * Copies the encrypted text to the clipboard.
   *
   * @returns {Promise<void>} A promise that resolves when the text is copied to the clipboard.
   */
  async function copyToClipboard() {
    if (encryptedText === '') {
      alert("Please encrypt the text first");
      return;
    }
    await navigator.clipboard.writeText(encryptedText);
  }

  // TODO: Add a function to decrypt the text
  // TODO: Add a function to rezize the input when the text is too long

  return (
    <div className='container'>
      <h1>Text Encryptor</h1>
      <form>
        <label>Enter text to encrypt: </label>
        <textarea rows="5" placeholder='Enter text to encrypt here...' value={text} onChange={e => setText(e.target.value)}></textarea>
        <label>Enter encryption key: </label>
        <input type='number' value={encryptionKey} onChange={e => setEncryptionKey(e.target.value)}/>
        <label>Encrypted text: </label>
        <div className='encrypted-text-container'>
          <input id='output-text' type='text' value={encryptedText} readOnly/>
          <ion-icon title="Copy to clipboard" name="clipboard-outline" className='clipboard-icon' onClick={copyToClipboard}></ion-icon>
        </div>
        <button type='submit' onClick={handleSubmit}>Encrypt</button>
      </form>
    </div>
  );
}

export default App;
