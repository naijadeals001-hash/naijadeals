# ENVIRONMENT VARIABLES

All variables below are future configuration contracts. Secrets must be managed securely and never committed to source control.

| Variable | Purpose | Scope | Example / Type | Requirement |
| --- | --- | --- | --- | --- |
| NODE_ENV | Runtime environment selector | all | dev | staging | prod | Required |
| APP_ENV | Application environment label | all | local | dev | staging | prod | Required |
| APP_NAME | Human-readable platform name | all | NaijaDeals | Required |
| APP_URL | Primary web application URL | all | https://app.example.com | Required |
| API_BASE_URL | Primary API gateway base URL | all | https://api.example.com | Required |
| WEB_BASE_URL | Frontend base URL | all | https://www.example.com | Required |
| ADMIN_BASE_URL | Admin frontend base URL | all | https://admin.example.com | Required |
| POSTGRES_URL | Primary PostgreSQL connection string | backend | postgres://... | Required |
| POSTGRES_READ_URL | Read replica connection string | backend | postgres://... | Optional |
| REDIS_URL | Redis / cache / queue connection string | backend | redis://... | Required |
| OBJECT_STORAGE_BUCKET | Default object storage bucket | backend | naijadeals-assets | Required |
| OBJECT_STORAGE_REGION | Object storage region | backend | africa-west / eu-west | Required |
| JWT_ACCESS_SECRET | Access token signing secret | security | *** | Required |
| JWT_REFRESH_SECRET | Refresh token signing secret | security | *** | Required |
| SESSION_ENCRYPTION_KEY | Session data encryption key | security | *** | Required |
| DATA_ENCRYPTION_KEY | Application data encryption key | security | *** | Required |
| GOOGLE_CLIENT_ID | Google OAuth client id | integration | *** | Required if adapter enabled |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | integration | *** | Required if adapter enabled |
| GOOGLE_MAPS_API_KEY | Google mapping services key | integration | *** | Required if mapping enabled |
| GOOGLE_CLOUD_PROJECT_ID | Google Cloud project id | integration | *** | Required if Google services enabled |
| GOOGLE_CLOUD_STORAGE_BUCKET | Google Cloud Storage bucket | integration | *** | Required if Google storage used |
| FIREBASE_PROJECT_ID | Firebase project id | integration | *** | Required if FCM used |
| FIREBASE_SERVICE_ACCOUNT_JSON | Firebase service account json | integration | *** | Required if FCM used |
| CLOUDFLARE_API_TOKEN | Cloudflare token | integration | *** | Required if Cloudflare automation enabled |
| PAYSTACK_SECRET_KEY | Paystack secret | integration | *** | Required if Paystack enabled |
| FLUTTERWAVE_SECRET_KEY | Flutterwave secret | integration | *** | Required if Flutterwave enabled |
| OPENAI_API_KEY | OpenAI API key | ai | *** | Required if OpenAI enabled |
| GEMINI_API_KEY | Google Gemini API key | ai | *** | Required if Gemini enabled |
| RESEND_API_KEY | Resend email key | integration | *** | Required if Resend enabled |
| TERMII_API_KEY | Termii SMS key | integration | *** | Required if Termii enabled |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | integration | *** | Required if Cloudinary enabled |
| CLOUDINARY_API_KEY | Cloudinary api key | integration | *** | Required if Cloudinary enabled |
| CLOUDINARY_API_SECRET | Cloudinary api secret | integration | *** | Required if Cloudinary enabled |
| OPENWEATHER_API_KEY | Weather provider key | integration | *** | Optional |
| SMILE_IDENTITY_API_KEY | KYC provider key | integration | *** | Required if KYC enabled |
| SMILE_IDENTITY_PARTNER_ID | KYC partner id | integration | *** | Required if KYC enabled |
| GA_MEASUREMENT_ID | Google Analytics measurement id | analytics | G-XXXX | Optional |
| CLARITY_PROJECT_ID | Microsoft Clarity project id | analytics | *** | Optional |
| SENTRY_DSN | Sentry project DSN | observability | *** | Required in staging/prod |
| MEILISEARCH_HOST | Search engine host | search | https://search.example.com | Required if search enabled |
| MEILISEARCH_API_KEY | Search engine key | search | *** | Required if search enabled |
| QUEUE_PREFIX | Queue namespace prefix | backend | naijadeals | Required |
| AUDIT_LOG_RETENTION_DAYS | Audit retention window | security | 3650 | Required |
| AI_CACHE_TTL_SECONDS | Default AI cache TTL | ai | 300 | Required |
| AI_MONTHLY_BUDGET_LIMIT | Monthly AI budget guardrail | ai | numeric | Required |
| RATE_LIMIT_REDIS_NAMESPACE | Rate limit namespace | security | ratelimit | Required |
