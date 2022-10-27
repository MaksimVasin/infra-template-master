import fetch from "node-fetch";

const {TOKEN, ORGID, TAG, TICKET_ID} = process.env;

const ticketFill = async () => {
  fetch('https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-143/comments', {
    method: 'POST',
    headers: {
      "Authorization": `OAuth ${TOKEN}`,
      "X-Org-ID": ORGID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: `Собрали образ в тегом ${ TAG }`,
    })
  });
}

ticketFill();