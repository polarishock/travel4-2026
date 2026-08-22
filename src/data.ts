import { DayItinerary, TodoItem, FlightInfo, HotelInfo, LockerInfo } from './types';

export const FLIGHT_DATA: FlightInfo = {
  code: 'JX802',
  route: 'TPE - TAK',
  time: '14:30 - 18:05'
};

export const HOTELS_DATA: HotelInfo[] = [
  {
    name: '東橫INN 丸龜站前',
    address: '香川縣丸龜市濱町 26-1',
    japaneseAddress: '香川県丸亀市浜町26-1'
  },
  {
    name: 'JR Hotel Clement Takamatsu',
    address: '香川縣高松市濱之町 1-1',
    japaneseAddress: '香川県高松市浜ノ町1-1'
  }
];

export const LOCKER_DATA: LockerInfo = {
  location: 'JR 高松站 1F',
  pin: '3F-A2',
  note: '大型行李箱可用，價格約 ¥700'
};

export const ITINERARY_DATA: DayItinerary[] = [
  {
    day: 1,
    date: '09/05 (六)',
    attractions: [
      {
        id: 's1-1',
        name: '抵達高松機場 (TAK)',
        time: '18:05',
        guide: '抵達後先前往入境大廳，領取行李。搭乘機場利木津巴士（丸龜坂出線）前往丸龜車站，車程約 40-50 分鐘。',
        photoSpot: '機場入境大廳歡迎看板，通常會有象徵香川縣的「讚岐烏龍麵」裝置藝術。',
        details: '高松機場是香川縣的主要門戶，以「烏龍麵機場」聞名。二樓的空運區域甚至設有烏龍麵出汁的飲水機。從機場到丸龜的利木津巴士不需要預約，現場購票即可。',
      },
      {
        id: 's1-2',
        name: '東橫INN 丸龜站前 Check-in',
        time: '20:30',
        guide: '抵達丸龜站後，飯店就在站前徒步 1 分鐘處。',
        photoSpot: '夜晚點燈的丸龜車站外觀，建築風格簡潔。',
        details: '東橫INN丸龜站前提供標準的日式商務旅館服務。丸龜站本身是予讚線上的重要車站，站內設有小型超市與便利商店，適合補給第一晚的物資。',
      },
    ],
  },
  {
    day: 2,
    date: '09/06 (日)',
    attractions: [
      {
        id: 's2-1',
        name: '四國真中千年物語 (觀光列車)',
        time: '10:19 - 12:34',
        ticket: '¥10,000+',
        guide: '從多度津搭乘觀光列車前往大步危，享用車上附餐。',
        photoSpot: '透過寬敞車窗欣賞大步危峽谷美景。',
        details: '這台列車的名字「真中」意指四國的中心。車廂設計融合了傳統家屋的溫暖感，甚至有供遊客更換的拖鞋。沿途當地居民會向列車揮手，展現四國特有的熱情好客文化。',
      },
      {
        id: 's2-2',
        name: '祖谷藤蔓橋 (かずら橋)',
        time: '13:38 - 14:30',
        ticket: '¥550',
        guide: '日本三大奇橋之一，以藤蔓編織而成，每三、四年更換一次。',
        photoSpot: '在橋中央向下俯瞰祖谷川。',
        details: '相傳藤蔓橋是 12 世紀平家武人在戰敗後，為了能在追兵趕到時快速斬斷橋樑而設計的。現今橋內藏有鋼筋以確保絕對安全，但仍保留了極高的懸空感與原始美。',
      },
      {
        id: 's2-3',
        name: '大步危峽觀光遊覽船',
        time: '15:40 - 16:30',
        ticket: '¥1,500',
        guide: '搭乘平穩的遊覽船航行於大步危峽谷，欣賞結晶片岩的奇特景觀。',
        photoSpot: '由下往上仰視陡峭的絕壁。',
        details: '「大步危」意指大步跨過也危險的地方。這裡的結晶片岩呈現藍綠色調，非常稀有。遊覽船由熟練的船伕操縱，在怪石粼粼的吉野川中穿梭，是體驗大自然力量的最佳方式。',
      },
    ],
  },
  {
    day: 3,
    date: '09/07 (一)',
    attractions: [
      {
        id: 's3-1',
        name: '金刀比羅宮 (金比羅樣)',
        time: '09:30 - 12:30',
        guide: '挑戰 785 階到御本宮（或 1,368 階到奧社），守護海上安全。',
        photoSpot: '御本宮觀景台俯瞰讚岐平原。',
        details: '自江戶時代起，金刀比羅宮就是日本人的「一生必去一次」的聖地。因地勢險要，古時甚至有代人參拜的「代參犬」。登頂後可以購買著名的黃色御守，象徵開運與幸福。',
      },
      {
        id: 's3-2',
        name: '丸龜城 (現存十二天守)',
        time: '14:30 - 16:30',
        ticket: '¥200',
        guide: '擁有日本最高的石垣（石牆），十二座現存天守之一。',
        photoSpot: '仰望極具魄力的巨大石垣。',
        details: '丸龜城的石垣高度總計約 60 公尺，是日本之最。其優美的曲線被稱為「扇之勾配」。雖然天守閣規模精緻，但其歷史價值極高，是香川縣引以為傲的歷史文化地標。',
      },
      {
        id: 's3-3',
        name: '一鶴 本店 (帶骨烤雞腿)',
        time: '18:00',
        guide: '必吃的在地名產「帶骨烤雞腿」，有親雞與雛雞兩種選擇。',
        photoSpot: '皮脆肉多汁的烤雞腿。',
        details: '「一鶴」是帶骨烤雞腿的元祖店。雞腿會塗上秘製辛香料後送入高溫烤箱，香氣鋪鼻。強烈建議搭配雞油拌飯或是用高麗菜蘸取剩餘的雞油食用，這是最道地的吃法。',
      },
    ],
  },
  {
    day: 4,
    date: '09/08 (二)',
    attractions: [
      {
        id: 's4-1',
        name: '父母濱 天空之鏡 (夕陽名所)',
        time: '15:00 - 18:30',
        guide: '退潮且無風時會出現倒影奇景，是極佳的網美拍攝地。',
        photoSpot: '夕陽餘暉下的剪影倒影照。',
        details: '父母濱原本是個沒落的小漁村，近年因為被發現極似玻利維亞的天空之鏡而爆紅。這裡的夕陽被入選為「日本夕陽百選」，溫暖的光影映照在潮池上，美不勝收。',
      },
    ],
  },
  {
    day: 5,
    date: '09/09 (三)',
    attractions: [
      {
        id: 's5-1',
        name: '特別名勝 栗林公園',
        time: '10:00 - 13:00',
        ticket: '¥410',
        guide: '米其林三星評鑑景點，以紫雲山為背景的借景園林。',
        photoSpot: '由南湖的小舟上拍攝掬月亭。',
        details: '栗林公園被譽為「一步一景」，是日本最大的大名庭園。園內栽種了約 1400 棵精心修剪的松樹，歷史可追溯至江戶時代初期，是香川縣最引以為傲的文化財產。',
      },
      {
        id: 's5-2',
        name: '高松商店街 (漫步採買)',
        time: '17:00 - 20:00',
        guide: '日本總長度最長的拱廊商店街，採買藥妝與伴手禮的好地方。',
        photoSpot: '丸龜町區圓頂天花板。',
        details: '高松商店街全長約 2.7 公里，其丸龜町區的改建案曾獲日本都市景觀大獎。這裡融合了現代百貨與傳統老店，即便雨天也能舒適地享受購物樂趣。',
      },
    ],
  },
  {
    day: 6,
    date: '09/10 (四)',
    attractions: [
      {
        id: 's6-1',
        name: '小豆島環島之旅',
        time: '08:00 - 15:30',
        ticket: '渡輪',
        guide: '造訪寒霞溪纜車、魔女宅急便拍攝地橄欖公園。',
        photoSpot: '橄欖公園白色風車前的掃帚起飛照。',
        details: '小豆島是瀨戶內海第二大島，以生產橄欖與醬油聞名。寒霞溪是日本三大溪谷美景之一。橄欖公園內的白色風車是為了紀念與希臘米洛島結為姊妹島而興建。',
      },
      {
        id: 's6-2',
        name: '天使之路 (Angel Road)',
        time: '16:00',
        guide: '一天僅出現兩次的沙堤，據說與戀人牽手走過會成真。',
        photoSpot: '從約定之丘展望台俯瞰整條沙堤。',
        details: '天使之路全長約 500 公尺，是連結小豆島與余島的連島沙洲。每天僅在乾潮前後兩次露出海面，被選為戀人聖地，是瀨戶內海最浪漫的景致之一。',
      },
    ],
  },
  {
    day: 7,
    date: '09/11 (五)',
    attractions: [
      {
        id: 's7-1',
        name: '鳴門觀光汽船 漩渦之旅',
        time: '11:40 - 12:20',
        ticket: '¥1,800',
        guide: '近距離觀賞世界最大級別的鳴門大漩渦。',
        photoSpot: '在甲板上正對著海面上劇烈旋轉的漩渦。',
        details: '鳴門海峽的漩渦是由播磨灘與紀伊水道之間的潮位差所引起，最強時流速可達時速 20 公里，是世界三大潮流之一。大潮期間漩渦直徑可達 20 公尺。',
      },
      {
        id: 's7-2',
        name: '大塚國際美術館',
        time: '13:30 - 16:30',
        ticket: '¥3,300',
        guide: '全世界首座陶瓷板名畫美術館，完整還原西斯汀教堂壁畫。',
        photoSpot: '壯闊的西斯汀大廳複製品。',
        details: '大塚國際美術館擁有世界上最大的展示空間，展示了超過 1000 件以特殊技術複製在陶瓷板上的西方名畫，能永久保持原有的色彩與質感。',
      },
    ],
  },
  {
    day: 8,
    date: '09/12 (六)',
    attractions: [
      {
        id: 's8-1',
        name: '高松城跡 (玉藻公園)',
        time: '09:00 - 11:00',
        ticket: '¥200',
        guide: '日本三大水城之一，城壕內引入的是海水。',
        photoSpot: '海水護城河與披雲閣相映。',
        details: '高松城（玉藻城）緊鄰瀨戶內海，其護城河與海洋相連，因此水位會隨潮汐變化。這裡保留了披雲閣這棟宏偉的日式傳統建築，展現了昔日藩主的豪華生活。',
      },
      {
        id: 's8-2',
        name: '高松機場離境',
        time: '19:05',
        guide: '行程結束，帶著滿滿回憶返回台灣。',
        photoSpot: '在高松機場進行最後的紀念合影。',
        details: '在高松機場進行最後採買，推薦購買各家名店的烏龍麵便利包或是高松限定的橄欖相關產品。帶著這八天的美好回憶，踏上歸途。',
      },
    ],
  },
];

export const INITIAL_TODOS: TodoItem[] = [
  // 重要文件
  { id: 'doc-1', text: '護照 (正本)', category: '重要文件', completed: false },
  { id: 'doc-2', text: '護照影本 / 大頭照 2 張', category: '重要文件', completed: false },
  { id: 'doc-3', text: '身分證 / 信用卡', category: '重要文件', completed: false },
  { id: 'doc-4', text: '日圓現金 / 機票 / 住宿證明', category: '重要文件', completed: false },
  { id: 'doc-5', text: '申請 Visit Japan Web', category: '重要文件', completed: false },
  
  // 手提行李
  { id: 'carry-1', text: '手機 / SIM 卡 / 行動電源', category: '手提 3C / 用品', completed: false },
  { id: 'carry-2', text: '充電線 / 相機 / 耳機', category: '手提 3C / 用品', completed: false },
  { id: 'carry-3', text: '水壺 / 頸枕 / 眼罩 / 筆', category: '手提 3C / 用品', completed: false },
  { id: 'carry-4', text: '個人藥品 / 衛生紙', category: '手提 3C / 用品', completed: false },
  
  // 托運行李 - 衣物
  { id: 'cloth-1', text: '外出服 / 睡衣 / 內衣褲', category: '托運衣物', completed: false },
  { id: 'cloth-2', text: '襪子 / 圍巾 / 手套', category: '托運衣物', completed: false },
  { id: 'cloth-3', text: '拖鞋 / 太陽眼鏡 / 帽子', category: '托運衣物', completed: false },
  
  // 托運行李 - 盥洗
  { id: 'wash-1', text: '牙刷 / 牙膏 / 梳子', category: '托運盥洗', completed: false },
  { id: 'wash-2', text: '洗髮精 / 沐浴乳 / 洗面乳', category: '托運盥洗', completed: false },
  { id: 'wash-3', text: '刮鬍刀 / 指甲剪 / 毛巾', category: '托運盥洗', completed: false },
  { id: 'wash-4', text: '保養品 / 防曬乳', category: '托運盥洗', completed: false },
];
