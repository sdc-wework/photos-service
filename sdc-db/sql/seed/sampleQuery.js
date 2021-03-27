const db = require('../index.js');
const helper = require('../helpers.js');

let query = `SELECT * FROM photos WHERE workspace_id = 999999`;

const sampleQuery = async (query) => {
  let client = await db.getClient();
  try {
    let res = await helper.q.runReadQuery(client, query);
    console.log(res);
  } catch (e) {
    console.error(e);
  } finally {
    client.release();
  }
};

sampleQuery(query);

/*

Result

[
  {
    photo_id: '0b17d0c9-7f8a-40f9-8a0b-38ba0f0fe616',
    description: 'DIY',
    url: 'http://res.cloudinary.com/blitva/image/upload/v1615532968/sdc-spacework/pwalxib9qodcbm2zyicm.jpg',
    workspace_id: 999999
  },
  {
    photo_id: 'd7af378b-297e-495f-8bf3-d3d4a0061c57',
    description: 'Mlkshk',
    url: 'http://res.cloudinary.com/blitva/image/upload/v1615535494/sdc-spacework/pwegopkukfffreynazfb.jpg',
    workspace_id: 999999
  },
  {
    photo_id: '37f1d257-8b69-4ec0-969c-979ac02e191c',
    description: 'Twee',
    url: 'http://res.cloudinary.com/blitva/image/upload/v1615534479/sdc-spacework/pwklxuxx0u1vqbex1euv.jpg',
    workspace_id: 999999
  },
  {
    photo_id: '8e402356-d5d6-4c55-b04a-ccbb550af607',
    description: 'Taxidermy',
    url: 'http://res.cloudinary.com/blitva/image/upload/v1615533367/sdc-spacework/pwnizkidvhl6a6lckmu2.jpg',
    workspace_id: 999999
  },
  {
    photo_id: 'd743d20f-14dd-4c3d-bfcc-ded8d32d3d9e',
    description: 'Hashtag',
    url: 'http://res.cloudinary.com/blitva/image/upload/v1615535072/sdc-spacework/pyajh5fgvzeml2q4fv6m.jpg',
    workspace_id: 999999
  },
  {
    photo_id: 'f45c252b-3454-4661-bc90-57498597787d',
    description: 'Put',
    url: 'http://res.cloudinary.com/blitva/image/upload/v1615533608/sdc-spacework/pynhdx3y0vlhdkjhoa1v.jpg',
    workspace_id: 999999
  },
  {
    photo_id: '1e29d75a-f775-496c-a785-e919e42bdf52',
    description: 'Cliche',
    url: 'http://res.cloudinary.com/blitva/image/upload/v1615533999/sdc-spacework/pzb2irkgbbyfgqgdvwin.jpg',
    workspace_id: 999999
  }
]

*/




