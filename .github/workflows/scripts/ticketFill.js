import fetch from "node-fetch";
import exec from "@actions/exec";

const {TOKEN, ORGID, ACTOR, TAG} = process.env;

const getComits = async () => {
  let comits = "коммиты, попавшие в релиз:\n"

  const options = {};
  let myError = '';
  options.listeners = {
    stdout: (data) => {
      comits += data.toString();
    },
    stderr: (data) => {
      myError += data.toString();
    }
  };

  await exec.exec('git log', ['--pretty=format:"%h %an %s"'], options);

  return comits;
}

const ticketFill = async () => {
  const newComits = await getComits();
  console.log('test');
  fetch('https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-143', {
    method: 'PATCH',
    headers: {
      "Authorization": `OAuth ${TOKEN}`,
      "X-Org-ID": ORGID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      summary: `Релиз ${ TAG } - ${ new Date().toLocaleDateString() }`,
      description: `ответсвтенный за рерлиз ${ ACTOR }\n${ newComits }`
    })
  });
}

ticketFill();