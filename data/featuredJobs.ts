import type { FeaturedJob } from "@/types/featured-job";

export const featuredJobs: FeaturedJob[] = [
  {
    id: "sample-frontend-engineer",
    title: "障害福祉サービスのプロダクト開発エンジニア",
    companyName: "サンプルケア株式会社",
    sourceSite: "Wantedly",
    location: "東京都",
    employmentType: "正社員",
    workStyle: "フルリモート可",
    itCategory: "フロントエンドエンジニア",
    supportAreas: ["就労支援", "福祉DX"],
    technologyTags: ["React", "TypeScript", "Next.js"],
    summary: "障害福祉事業所で使われる業務支援サービスの開発に携わるポジションです。",
    checkedAt: "2026年7月10日",
    detailPath: "/jobs/sample-frontend-engineer",
    externalUrl: "https://example.com/jobs/sample-frontend-engineer",
    externalUrlNote: "example.comは表示確認用のダミーURLです。",
    detail: {
      about:
        "障害福祉の現場で働く支援者の業務負担を減らし、利用者への支援に集中できる環境づくりを目指すプロダクト開発です。",
      socialIssue: "障害福祉事業所における記録・情報共有・業務管理の効率化。",
      responsibilities: ["Webアプリケーションの新機能開発", "UI改善", "API連携", "デザイナーやバックエンドエンジニアとの協働"],
      technologies: ["React", "TypeScript", "Next.js"],
      salary: "年収600万円〜800万円",
    },
  },
  {
    id: "sample-backend-engineer",
    title: "発達障害支援の現場を支える業務支援システム開発",
    companyName: "サンプルリンク合同会社（表示確認用）",
    sourceSite: "Green（サンプル）",
    location: "神奈川県",
    employmentType: "契約社員",
    workStyle: "ハイブリッド勤務",
    itCategory: "バックエンド",
    supportAreas: ["発達障害支援", "業務支援システム"],
    technologyTags: [],
    summary: "支援記録や面談予定を扱うシステムのAPI設計・データ連携を担当する、比較表示のためのサンプル求人です。",
    checkedAt: "2026年7月10日",
  },
  {
    id: "sample-accessibility-pm",
    title: "精神障害支援プロダクトのアクセシビリティ推進PM",
    companyName: "サンプルウェルビーイング株式会社（表示確認用）",
    sourceSite: "求人ボックス（サンプル）",
    location: "全国",
    employmentType: "業務委託",
    workStyle: "リモート可",
    itCategory: "PM",
    supportAreas: ["精神障害支援", "アクセシビリティ"],
    technologyTags: [],
    summary: "利用者と支援者の双方が迷わず使えるプロダクトを目指し、要件整理と改善計画を進めるサンプル求人です。",
    checkedAt: "2026年7月10日",
  },
];

export const detailedFeaturedJobs = featuredJobs.filter((job) => job.detailPath && job.detail && job.externalUrl);

export const getFeaturedJobById = (id: string) => detailedFeaturedJobs.find((job) => job.id === id);
