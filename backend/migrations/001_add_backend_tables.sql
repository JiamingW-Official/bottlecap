-- Migration 001: Backend support tables
-- Run against your Supabase project via SQL editor

-- scraped_data_cache: stores scraper results with TTL
CREATE TABLE IF NOT EXISTS scraped_data_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,            -- 'alibaba', 'google_trends', 'usitc', 'comtrade', 'amazon'
  query_hash TEXT NOT NULL,        -- SHA256 of query params
  query TEXT NOT NULL,             -- original query string
  data JSONB NOT NULL,             -- scraped result
  scraped_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  UNIQUE(source, query_hash)
);

CREATE INDEX IF NOT EXISTS idx_cache_lookup ON scraped_data_cache(source, query_hash);
CREATE INDEX IF NOT EXISTS idx_cache_expiry ON scraped_data_cache(expires_at);

-- trending_products: refreshed daily by Beat scheduler
CREATE TABLE IF NOT EXISTS trending_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT NOT NULL UNIQUE,
  category TEXT,
  trend_score INT,
  search_volume TEXT,
  yoy_growth TEXT,
  trend_data JSONB,
  scraped_at TIMESTAMPTZ DEFAULT now()
);

-- quiz_leads: from the manufacturing quiz tool
CREATE TABLE IF NOT EXISTS quiz_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  quiz_answers JSONB NOT NULL,
  recommendation JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- analysis_progress: tracks step-by-step analysis progress
CREATE TABLE IF NOT EXISTS analysis_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id),
  step TEXT NOT NULL,
  progress INT NOT NULL DEFAULT 0,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_progress_report ON analysis_progress(report_id);

-- RLS policies for new tables
ALTER TABLE scraped_data_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE trending_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_progress ENABLE ROW LEVEL SECURITY;

-- Service role has full access (backend uses service role key)
CREATE POLICY "Service role full access on scraped_data_cache"
  ON scraped_data_cache FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on trending_products"
  ON trending_products FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Public read trending_products"
  ON trending_products FOR SELECT
  USING (true);

CREATE POLICY "Service role full access on quiz_leads"
  ON quiz_leads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on analysis_progress"
  ON analysis_progress FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Public read analysis_progress by report_id"
  ON analysis_progress FOR SELECT
  USING (true);
