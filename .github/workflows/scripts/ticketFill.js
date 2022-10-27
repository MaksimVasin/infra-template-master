import exec from "@actions/exec";
import fetch from "node-fetch";

const {TOKEN, ORGID, ACTOR, TAG, TICKET_ID} = process.env;

const getComits = async () => {
  let tagsArr = [];
  const optionsTags = {};
  optionsTags.listeners = {
    stdout: (data) => {
      tagsArr = data.toString().split('\n');
    },
  };
  await exec.exec('git tag','', optionsTags);
  const tagsRelease = tagsArr.filter(item => (/^rc-0.0.\d{1,}$/).test(item));

  if (tagsRelease.length == 0) return 'Нет коммитов, попавших в релиз.';
  let tagsLast = 
    tagsRelease.length == 1 ? 
    tagsRelease[0] :
    `${ tagsRelease[tagsRelease.length - 2] }...${ tagsRelease[tagsRelease.length - 1] }`

  let comits = "Коммиты, попавшие в релиз:\n"
  const options = {};
  options.listeners = {
    stdout: (data) => {
      comits += data.toString();
    }
  };
  await exec.exec('git log', ["--pretty=format: %h %an %s", tagsLast], options);
  return comits;
}

const ticketFill = async () => {
  const newComits = await getComits();
  fetch(`https://api.tracker.yandex.net/v2/issues/${TICKET_ID}`, {
    method: 'PATCH',
    headers: {
      "Authorization": `OAuth ${TOKEN}`,
      "X-Org-ID": ORGID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      summary: `Релиз ${ TAG } - ${ new Date().toLocaleDateString() }`,
      description: `ответсвтенный за релиз ${ ACTOR }\n${ newComits }`
    })
  });
}

ticketFill();