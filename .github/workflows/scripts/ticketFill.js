import fetch from "node-fetch";

const {TOKEN, ORGID, ACTOR, TAG} = process.env;

const getComits = async () => {
  return `<хеш коммита1> <автор коммита1> <описание коммита1>
  <хеш коммита2> <автор коммита2> <описание коммита2>`
}

const ticketFill = async () => {
  //const newComits = await getComits();
  fetch('https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-143', {
    method: 'PATCH',
    headers: {
      "Authorization": `OAuth ${TOKEN}`,
      "X-Org-ID": ORGID,
      'Content-Type': 'application/json'
    },
    body: `{
      "summary": "Релиз ${ TAG } - ${ new Date().toLocaleDateString() }", 
      "description": "ответственный за релиз ${ ACTOR }\nкоммиты, попавшие в релиз:\n<хеш коммита> <автор коммита> <описание коммита>"
    }`
  });
}

ticketFill();