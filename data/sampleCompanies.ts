import type { CompanyCardProfile } from "@/types/company";

export const sampleCompanies: CompanyCardProfile[] = [
  {
    id: "sample-care",
    name: "サンプルケア株式会社",
    description:
      "障害福祉事業所向けの業務支援サービスを開発するサンプル企業です。",
    businessArea: "障害福祉事業所向けSaaS",
    supportAreas: ["就労支援", "福祉DX"],
    technologyRole:
      "記録、請求、情報共有などの業務を支援するWebサービスを開発しています。",
    workStyles: ["フルリモート可", "フレックス"],
    location: "東京都",
    organizationType: "株式会社",
    foundedYear: 2018,
    openJobCount: 2,
  },
  {
    id: "sample-inclusion",
    name: "サンプルインクルージョン合同会社",
    description:
      "発達障害のある人の学習や就労を支援するサービスを提供するサンプル企業です。",
    businessArea: "発達障害支援・教育支援",
    supportAreas: ["発達障害支援", "教育"],
    technologyRole:
      "利用者ごとの支援計画や学習記録を管理するプロダクトを開発しています。",
    workStyles: ["ハイブリッド勤務", "副業可"],
    location: "神奈川県",
    organizationType: "合同会社",
    foundedYear: 2020,
    openJobCount: 1,
  },
  {
    id: "sample-wellbeing-npo",
    name: "サンプルウェルビーイングNPO",
    description: "精神障害のある人の地域生活や就労を支援するサンプル団体です。",
    businessArea: "精神障害支援・地域福祉",
    supportAreas: ["精神障害支援", "NPO", "アクセシビリティ"],
    technologyRole:
      "相談支援や地域連携を円滑にする情報共有システムを運用しています。",
    workStyles: ["リモート可", "時短勤務相談可"],
    location: "大阪府",
    organizationType: "NPO法人",
    foundedYear: 2015,
    openJobCount: 1,
  },
];
