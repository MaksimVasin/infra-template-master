import fetch from "node-fetch";

const {TOKEN, ORGID, TAG, TICKET_ID} = process.env;

const ticketFill = async () => {
  console.log('Создание комментария');
  fetch(`https://api.tracker.yandex.net/v2/issues/${TICKET_ID}/comments`, {
    method: 'POST',
    headers: {
      "Authorization": `OAuth ${TOKEN}`,
      "X-Org-ID": ORGID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: `Собрали образ с тегом ${ TAG }`,
    })
  });
}

ticketFill().then(() => { console.log('Комментарий об образа создан') });