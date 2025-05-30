const generatePoolArray = (LETTER_POOL) => {
  let poolArray = [];
  for(let letter in LETTER_POOL){
    for(let i = 0; i<LETTER_POOL[letter]; i++){
      poolArray.push(letter);
    }
  }
  return poolArray;
};

export const drawLetters = () => {
  // Implement this method for wave 1
    const LETTER_POOL = {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
  };

  let poolArray = generatePoolArray(LETTER_POOL);

  const HANDSIZE = 10;
  let hand = [];
  let handDict = {};
  for(let i = 0; hand.length < HANDSIZE; i++){
    let randomNum = Math.floor(Math.random() * (poolArray.length));
    let letter = poolArray[randomNum];

    if(handDict[letter] === undefined || handDict[letter] < LETTER_POOL[letter]){
      hand.push(letter);
      if(handDict[letter] === undefined){
        handDict[letter] = 1;
      }else{
        handDict[letter]++;
      }
    }
  }
  return hand;  
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  for(let i = 0; i < input.length; i++){
    let letterIndex = lettersInHand.indexOf(input[i]);
    if (letterIndex === -1){
      return false;
    }
    lettersInHand.splice(letterIndex, 1);
  }
  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  const calcScore =(word)=>{
    const scoreChart = {
      A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
      D: 2, G: 2,
      B: 3, C: 3, M: 3, P: 3,
      F: 4, H: 4, V: 4, W: 4, Y: 4,
      K: 5,
      J: 8, X: 8,
      Q: 10, Z: 10
    };

    let totalScore = 0;
    for(let i = 0; i < word.length; i++){
      let char = word[i].toUpperCase();
      totalScore += scoreChart[char];
    }
    return totalScore;
  };

  let score = calcScore(word);
  const ADDITIONALPOINTS = 8;
  if(7 <= word.length && word.length <= 10){
    score += ADDITIONALPOINTS;
  }
  return score;

};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
  let winningWord = {
    word: '',
    score: 0
  };

  for(let i = 0; i < words.length; i++){
    let wordScore = scoreWord(words[i]);
    if(wordScore > winningWord.score ||
      wordScore===winningWord.score 
      && tieBreakerFirstIsBetter(words[i], winningWord.word )){
      winningWord.word = words[i];
      winningWord.score = wordScore;
    }
  }
  return winningWord;
};

const tieBreakerFirstIsBetter = (word1, word2)=>{
  let BEST_LETTER_COUNT = 10;
  if(word2.length === BEST_LETTER_COUNT){
    return false;
  }
  if(word1.length === BEST_LETTER_COUNT){
    return true;
  }
  return word1.length<word2.length;  
};
