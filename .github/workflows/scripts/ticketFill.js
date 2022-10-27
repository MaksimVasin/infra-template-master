import fetch from "node-fetch";

const {TOKEN, ORGID, ACTOR, TAG} = process.env;

const ticketFill = async () => {
  console.log('test');
  fetch('https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-143', {
    method: 'PATCH',
    headers: {
      "Authorization": `OAuth ${TOKEN}`,
      "X-Org-ID": ORGID,
      'Content-Type': 'application/json'
    },
    body: `{
      "summary": "Релиз ${ TAG } - ${ new Date().toLocaleDateString() }", 
      "description": "ответсвтенный за рерлиз: ${ ACTOR }"
    }`
  });
}

ticketFill();