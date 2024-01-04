class GetJapanEarthquakeData {

    constructor() {}
  
    getInfo() { // 拡張機能の各種情報
      return {
        id: 'GetJapanEarthquakeData',
        name: 'GetJapanEarthquakeData', // 拡張機能の名前
        blocks: [ // 各ブロックの定義
            {
              opcode: 'get', // このブロックが実行されると、helloという関数が呼ばれる
              blockType: Scratch.BlockType.COMMAND,　// 「10歩動かす」のような通常の命令ブロック
              text: 'Get the newest Earthquake Data in Japan' // ブロックに表示されるテキスト
            }
        ]
      }
    }
  
    hello() {
        async function get() {
            const response = await fetch("https://api.p2pquake.net/v2/history?codes=551&limit=1")
            .then(response => response.json());
        
            const info = response[0];
        
            let each_places_scale = info.points.map(i => { return {"place" : i.pref + " " + i.addr, "scale" : parseInt(i.scale) / 10} });
            each_places_scale.sort((a, b) => b.scale - a.scale);
        
            return `${info.time},${info.earthquake.hypocenter.name},${info.earthquake.maxScale},${info.earthquake.hypocenter.magnitude},${info.earthquake.hypocenter.depth},${info.earthquake.hypocenter.latitude},${info.earthquake.hypocenter.longitude},${each_places_scale}`;
        }
    }
}
  
Scratch.extensions.register(new GetJapanEarthquakeData());
