function convertScoreToGradeWithPlusAndMinus(score) {
  if (score > 100 || score < 0) return 'INVALID SCORE';
  if (score === 100) return 'A+';

  let grade = '';
  score = score.toString();

  if (score[0] === 9) grade = 'A';
  else if (score[0] === 8) grade = 'B';
  else if (score[0] === 7) grade = 'C';
  else if (score[0] === 6) grade = 'D';
  else if (score[0] <= 5) grade = 'F';

  //   if (grade === 'F') return grade;
  //   else if (score[1] >= 0 && score[1] <= 2) return grade + '-';
  //   else if (score[1] >= 8 && score[1] <= 9) return grade + '+';
  //   else return grade;
  return grade;
}

console.log(convertScoreToGradeWithPlusAndMinus(89));
