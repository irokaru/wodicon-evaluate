export const SHARE_SITE_URL = "https://wodicon-evaluate.nononotyaya.net/";
export const SHARE_HASHTAG = "#ウディコン評価算出機";
export const X_INTENT_POST_URL = "https://x.com/intent/post";

export interface ShareSummary {
  voteCount: number;
  labels: string[];
  averages: (string | number)[];
  medians: (string | number)[];
  totals: (string | number)[];
}

export const buildShareText = ({
  voteCount,
  labels,
  averages,
  medians,
  totals,
}: ShareSummary): string => {
  return (
    `投票数: ${voteCount}\n` +
    `項目: ${labels.join(" ")}\n` +
    `平均値: ${averages.join(" ")}\n` +
    `中央値: ${medians.join(" ")}\n` +
    `合計値: ${totals.join(" ")}\n` +
    `${SHARE_HASHTAG}\n` +
    SHARE_SITE_URL
  );
};

export const buildShareUrl = (shareText: string): string => {
  return `${X_INTENT_POST_URL}?text=${encodeURIComponent(shareText)}`;
};
