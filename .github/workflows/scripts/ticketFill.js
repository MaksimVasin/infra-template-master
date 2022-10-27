import fetch from "node-fetch";

const {TOKEN, ORGID, ACTOR, TAG} = process.env;

const getComits = async () => {
  return `<хеш коммита1> <автор коммита> <описание коммита>
  <хеш коммита2> <автор коммита> <описание коммита>`
}

const ticketFill = async () => {
  const newComits = await getComits();
  fetch('https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-143', {
    method: 'PATCH',
    headers: {
      "Authorization": `OAuth ${TOKEN}`,
      "X-Org-ID": ORGID,
      'Content-Type': 'application/json'
    },
    body: `{
      "summary": "Релиз ${ TAG } - ${ new Date().toLocaleDateString() }", 
      "description": "ответственный за релиз ${ ACTOR }
      коммиты, попавшие в релиз:
      ${ newComits }"
    }`
  });
}

ticketFill();