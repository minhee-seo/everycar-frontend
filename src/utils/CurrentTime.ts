// src\utils\CurrentTime.ts

// 현재 시간으로부터 4시간 이후 계산
export function getFourHoursLater(): Date {
  const now = new Date();
  return new Date(now.getTime() + 4 * 60 * 60 * 1000);
}

// 현재 시간으로부터 4시간 후 시점의 6시간 이후 계산
export function getSixHoursAfterFourHoursLater(): Date {
  const fourHoursLater = getFourHoursLater();
  return new Date(fourHoursLater.getTime() + 6 * 60 * 60 * 1000);
}