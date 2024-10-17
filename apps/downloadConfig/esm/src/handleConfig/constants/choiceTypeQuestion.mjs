var typeEnum = /* @__PURE__ */ ((typeEnum2) => {
  typeEnum2[typeEnum2["Gitee"] = 0] = "Gitee";
  typeEnum2[typeEnum2["GitHub"] = 1] = "GitHub";
  return typeEnum2;
})(typeEnum || {});
const choiceTypeQuestion = [
  {
    type: "list",
    // interaction type
    name: "type",
    // the key value you entered
    message: "please choice download type",
    // tips
    default: 0 /* Gitee */,
    choices: [
      {
        value: 0 /* Gitee */,
        name: "download files from gitee"
      },
      {
        value: 1 /* GitHub */,
        name: "download files from github"
      }
    ]
  }
];

export { choiceTypeQuestion, typeEnum };
