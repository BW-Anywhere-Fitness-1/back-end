exports.seed = (knex) => {
  return knex("classes").insert([
    {
      name: "Judo",
      start_time: "3:00:00 pm",
      duration: "30min",
      level: "Beginner",
      location: "600 Deer Field Trace, Mebane, NC 27302",
      attendees: 5,
      max_size: 1,
      schedule: ["Monday", "Wednesday", "Thursday"],
      description: "Martial art for beginner",
    },
    {
      name: "Yoga",
      start_time: "4:00:00 am",
      duration: "30min",
      level: "Intermediate",
      location: "600 Deer Field Trace, Durham, NC 27302",
      attendees: 5,
      max_size: 1,
      schedule: ["Monday", "Tuesday", "Thursday"],
      description: "Yoga Intermediate",
    },
    {
      name: "Dance",
      start_time: "5:00:00 pm",
      duration: "45min",
      level: "Beginner",
      location: "600 Deer Field Trace, Raleigh, NC 27302",
      attendees: 5,
      max_size: 1,
      schedule: ["Monday", "Thursday", "Sunday"],
      description: "Cardio Dance for beginner",
    },
  ]);
};
