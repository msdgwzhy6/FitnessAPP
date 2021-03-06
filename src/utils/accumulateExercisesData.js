export const accumulateExercisesData = ({
  list,
  todayNumber,
  todayDate,
  period,
}) => {
  let reps = 0,
    sets = 0,
    workouts = 0,
    volume = 0;
  // const todayNumber = parseInt(todayNumber, 10);
  const startDateNumber = calculateStartDate({ today: todayDate, period });
  for (const key in list) {
    if (list.hasOwnProperty(key)) {
      if (belongToRange({ startDateNumber, todayNumber, key })) {
        workouts++;
        list[key].map((item, index) => {
          if (item.sets) {
            sets += parseInt(item.sets, 10);
          }
          if (item.minutes) {
            ++sets;
          }
          if (item.weightRepsDataArr?.length) {
            item.weightRepsDataArr.map((item, index) => {
              if (item.reps && item.weight) {
                reps += parseInt(item.reps);
                volume += item.reps * item.weight;
              }
            });
          }
        });
      }
    }
  }
  return { sets, reps, workouts, volume };
};

export const belongToRange = ({ startDateNumber, todayNumber, key }) => {
  return key >= startDateNumber && key <= todayNumber;
};

export const calculateStartDate = ({ today, period }) => {
  const date = new Date(today.getTime() - period * 24 * 3600 * 1000);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  return year + month + day;
};
