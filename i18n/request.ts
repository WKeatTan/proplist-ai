// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { AppLanguage } from '@/src/shared/enums';

export default getRequestConfig(async () => {
  // Priority: DB preference (passed via cookie) → Cookie → Default EN
  const cookieStore = await cookies();
  const locale =
    (cookieStore.get('preferred_language')?.value as AppLanguage) ?? AppLanguage.EN;

  return {
    locale,
    messages: (await import(`../messages/${locale}/common.json`)).default,
  };
});
