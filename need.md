## 首頁

- getBlock
  - 拿區塊的內容
- getDomain
  - src / pw / sw
- getCategory
  - 依 tab 來取
- postSearch
  - body : { search: string }

## 收藏

- getCollectComic
  - 使用者收藏書本
- getPurchaseComic
  - 使用者購買的書本
  - 需要的回傳值 { cover: string; title: string; rate: number; views: number; }

## 會員中心

- getUserInfo
  - return { userId: number; coins: number; vipDate: string }

## Auth

- 登錄
- 登出
- postRegister
  - body : { acc: string; password: string; }
- postBindingPhone
  - body : { mail: string; phoneNumber: string; nickName: string; }
- postFindBackUserAccount
  - body : { '單號': string; }

## 錢包

- getChargeRecord
- getPurchaseRecord

## 充值

- ^U^
