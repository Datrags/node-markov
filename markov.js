/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chainObj = {}
    for (let i = 0; i < this.words.length; i++) {
      //console.log(this.words[i])
      if (this.words[i] in chainObj) {
        if (this.words[i + 1] != undefined)
          chainObj[this.words[i]].push(this.words[i + 1]);  
        else{
          chainObj[this.words[i]].push(null);  
        }

      }
      else {

        if (this.words[i + 1] != undefined)
          chainObj[this.words[i]] = [this.words[i+1]];
        else 
          chainObj[this.words[i]] = [null];  
       // console.log(this.words[i], 'should push', this.words[i+1])
      }

    }
    return chainObj;
  }
    


  /** return random text from chains */

  makeText(numWords = 100) {

    let key = Object.keys(this.chains)[Math.floor(Object.keys(this.chains).length * Math.random())];
    let s = key + " ";
    let arr = this.chains[key];
    for (let i = 2; i < numWords; i++) {
      let randomWord = arr[Math.floor(arr.length * Math.random())]
      if (randomWord === null)
        randomWord = Object.keys(this.chains)[0];
      s += randomWord + " ";

      key = randomWord;
      arr = this.chains[key];
      
    }

  return s;
  }
}





module.exports = { MarkovMachine };