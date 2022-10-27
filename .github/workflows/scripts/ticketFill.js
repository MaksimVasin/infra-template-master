import fetch from "node-fetch";
import exec from "@actions/exec";

const {TOKEN, ORGID, ACTOR, TAG} = process.env;

const getComits = async () => {
  let tagsArr = [];
  const optionsTags = {};
  optionsTags.listeners = {
    stdout: (data) => {
      console.log('TAGS:', data.toString().split('\n'));
      tagsArr = data.toString().split('\n');
    },
  };
  await exec.exec('git tag','', optionsTags);
  // отфильтровать
  console.log('до фильтра: ', tagsArr);
  tagsArr = tagsArr.filter(item => (/^rc-\d{1,}.\d{1,}.\d{1,}$/).test(item));
  console.log('после фильтра: ', tagsArr);
  let tags = tagsArr.length == 1? tagsArr[0] : `${ tagsArr[tagsArr.length - 2] }...${ tagsArr[tagsArr.length - 1] }`

  console.log('length', tagsArr.length);
  console.log('length - 1', tagsArr.length - 1);
  console.log('length - 2', tagsArr.length - 2);
  console.log('elem', tagsArr[0]);


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

  //let tag = 'rc-0.0.33';
  console.log(tags);
  await exec.exec('git log', ["--pretty=format: %h %an %s", tags], options);

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