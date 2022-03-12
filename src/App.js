import React from 'react';
import copy from './components/img/copy.svg';
import './components/styles/style.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      lowercaseCheckBox: true,
      uppercaseCheckBox: true,
      numbersCheckBox: true,
      symbolsCheckBox: true
    }
  }

  // Display password length value to the user.
  passwordLength(e) {
    let lengthDisplay = document.querySelector(".length-display");
    lengthDisplay.innerText = e.target.value;
    return;
  }

  alphabets() {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  numberList() {
    return "0123456789";
  }

  symbolList() {
    return "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/";
  }

  generatePassword(e) {

    let lowerletters;
    let upperletters;
    let numbers;
    let symbols;
    let generatedPassword  = "";

    e.preventDefault();

    // Return an error to the user if no option is selected.
    if(!this.lowercase.checked && !this.uppercase.checked && !this.numbers.checked && !this.symbols.checked) {

      let feedbackElement = document.querySelector(".error-wrapper");

      feedbackElement.style.display = "block"
      feedbackElement.firstChild.innerText = "Select at least one option";

      setTimeout(() => {
        feedbackElement.style.display = ""
      }, 3000)

      return;
    }
    
    // Return an error to the user if only symbol option is selected.
    if(!this.lowercase.checked && !this.uppercase.checked && !this.numbers.checked && this.symbols.checked) {

      let feedbackElement = document.querySelector(".error-wrapper");

      feedbackElement.style.display = "block"
      feedbackElement.firstChild.innerText = "You can not select only the symbol option";

      setTimeout(() => {
        feedbackElement.style.display = ""
      }, 3000)

      return;
    }

    // Add lowercase letters to generatedPassword if the option is checked.
    if(this.lowercase.checked) {
      //shuffle letters and reduce the length to the password length the user choosed
      lowerletters = this.alphabets().repeat(4).toLowerCase().split('').sort(function(){return 0.5-Math.random()}).join('').slice(0, this.length.value);
      generatedPassword += lowerletters;
    }

    // Add uppercase letters to generatedPassword if the option is checked.
    if(this.uppercase.checked) {
      // shuffle letters and reduce the length to the password length the user selected.
      upperletters = this.alphabets().repeat(4).split('').sort(function(){return 0.5-Math.random()}).join('').slice(0, this.length.value);
      generatedPassword += upperletters;
    }
    // Add numbers to generatedPassword if the option is checked.
    if(this.numbers.checked) {
      //shuffle numbers and reduce the length to the password length the user selected.
      numbers = this.numberList().repeat(10).split('').sort(function(){return 0.5-Math.random()}).join('').slice(0, this.length.value);
      generatedPassword += numbers;
    }
    // Add symbols letters to generatedPassword if the option is checked.
    if(this.symbols.checked) {
      //shuffle symbols and reduce the length to the password length the user selected.
      symbols = this.symbolList().repeat(4).split('').sort(function(){return 0.5-Math.random()}).join('').slice(0, this.length.value);
      generatedPassword += symbols;
    }
    
    // Shuffle final password and reduce the length to the password length the user selected.
    generatedPassword = generatedPassword.split('').sort(function(){return 0.5-Math.random()}).join('').split('').sort(function(){return 0.5-Math.random()}).join('').slice(0, this.length.value);
    
    // Set value of the text field to the generated password.
    this.passfield.value = generatedPassword;

    return;

  }

  //function to copy password from the textfield
  copyPassword() {

    let passfield = document.querySelector(".passfield")
    let feedbackEle = document.querySelector(".copy-feedback");

    /* Select the text field */    
    passfield.select();
    passfield.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    // Only display feedback when passfield contains a value.
    if (passfield.value) {

      feedbackEle.style.top = "22px";
      setTimeout(() => { feedbackEle.style.top = ""; }, 2000)

    }

    return;

  }
  
  // show custom checkbox if its corresponding input checkbox is checked
  lowercaseState = () => { return this.setState({ lowercaseCheckBox: !this.state.lowercaseCheckBox, }); }
  uppercaseState = () => { return this.setState({ uppercaseCheckBox: !this.state.uppercaseCheckBox, }); }
  numbersState = () => { return this.setState({ numbersCheckBox: !this.state.numbersCheckBox, }); }
  symbolsState = () => { return this.setState({ symbolsCheckBox: !this.state.symbolsCheckBox, }); }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Password Generator</h1>
          <p>Use this tool to instantly create secure, random passwords.</p>
          <div className="form-wrapper">
            <div className="form-inner-wrapper">
              <div className="copy-feedback">
                <p>** Copied</p>
              </div>
              <form method="post" action="" onSubmit={(e) => this.generatePassword(e) } >
                <div className="form-top-section">
                  <input type="text" name="" className="passfield" ref={(input) => this.passfield = input} readOnly/>
                  <div className="copy-wrapper" title="Copy Password" onClick={(e) => this.copyPassword() }><img src={ copy } alt="Copy Icon" /></div>
                </div>
                <div className="form-footer-section">
                  <div className="form-footer-main-column">
                    <label>Password Length</label>
                      <input type="range" name="" onChange={(e) => this.passwordLength(e) } defaultValue="16" ref={(input) => this.length = input } min="6" max="100" step="1"/>
                      <div className="length-display">16</div>                    
                  </div>
                  <div className="form-footer-main-column">
                    <div className="form-footer-column">
                      <label className={(this.state.lowercaseCheckBox) ? "selected":""}>
                        <input type="checkbox" name="" onChange={this.lowercaseState} defaultChecked={this.state.lowercaseCheckBox} ref={(input) => this.lowercase = input } />
                        <span>Lowercase</span>
                        <span className="check"></span>
                      </label>
                      <label className={(this.state.uppercaseCheckBox) ? "selected":""}>
                        <input type="checkbox" name="" onChange={this.uppercaseState} defaultChecked={this.state.uppercaseCheckBox} ref={(input) => this.uppercase = input } />
                        <span>Uppercase</span>
                        <span className="check"></span>
                      </label>
                    </div>
                    <div className="form-footer-column">
                      <label className={(this.state.numbersCheckBox) ? "selected":""}>
                        <input type="checkbox" name="" onChange={this.numbersState} defaultChecked={this.state.numbersCheckBox} ref={(input) => this.numbers = input } />
                        <span>Numbers</span>
                        <span className="check"></span>
                      </label>
                      <label className={(this.state.symbolsCheckBox) ? "selected":""}>
                        <input type="checkbox" name="" onChange={this.symbolsState} defaultChecked={this.state.symbolsCheckBox} ref={(input) => this.symbols = input } />
                        <span>Symbols</span>
                        <span className="check"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-button">
                  <input type="submit" className="generate-button" value="Generate Password" />
                </div>
              </form>
              <div className="error-wrapper">
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
