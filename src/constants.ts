import { Template } from "./types";

export const TEMPLATES: Template[] = [
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 1. Web Application Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'web-app-testing',
    name: 'Web Application Testing',
    description: 'End-to-end, cross-browser, and functional testing frameworks for modern web apps.',
    icon: 'Globe',
    category: 'web',
    collection: 'core-engineering',
    domains: [
      'E-Commerce / Retail', 'Banking & Finance', 'Healthcare', 'SaaS / B2B',
      'Media & Streaming', 'Government & Public Sector', 'Education & EdTech',
      'Travel & Hospitality', 'Insurance', 'Telecom'
    ],
    subTemplates: [
      {
        id: 'playwright-ts',
        name: 'Playwright with TypeScript',
        description: 'Modern, fast, and reliable E2E testing with auto-wait and trace viewer.',
        prompt: 'Build a production-grade Playwright E2E testing framework in TypeScript as used by teams at Netflix, Airbnb, and Microsoft. Include: (1) Page Object Model (POM) with BasePage class containing shared wait strategies; (2) fixture-based authentication — global setup saves authenticated storageState to file, reused across all tests (10x faster than per-test login); (3) Playwright test sharding across 4 workers with --shard=1/4 syntax for CI parallelism; (4) axe-playwright accessibility scans on every page visit with WCAG 2.1 AA violation reporting; (5) visual regression with toHaveScreenshot() and 0.2% pixel tolerance threshold; (6) API route interception using page.route() to stub slow third-party services; (7) Allure reporter with screenshot, video, and trace on failure; (8) GitHub Actions matrix across chromium, firefox, webkit with artifact upload for failed traces; (9) Core Web Vitals measurement using CDPSession (LCP, CLS, FID) with p75 threshold assertions; (10) test tagging strategy @smoke @regression @critical with --grep filtering; (11) Custom expect extensions for common domain assertions; (12) playwright.config.ts with baseURL, retries: 2, and environment-specific configuration. Generate full file set including 15+ tests for login, checkout, dashboard, form validation, and error states.'
      },
      {
        id: 'cypress-js',
        name: 'Cypress',
        description: 'Developer-friendly E2E testing with real-time reload and time-travel debugging.',
        prompt: 'Build a production-grade Cypress E2E testing framework as used at Shopify and DocuSign. Include: (1) Custom commands in commands.ts for login (cy.login()), API token seeding (cy.seedUser()), and table assertions; (2) cy.intercept() stubs for all third-party API calls — inject controlled responses so tests never depend on external services; (3) Cypress Component Testing (ct) for isolated React/Vue component tests alongside E2E tests in the same project; (4) Session management with cy.session() caching authenticated state — reduces test runtime by 60%; (5) Percy visual testing integration with cy.percySnapshot(); (6) environment configuration via cypress.env.json and Cypress.env() with secrets from GitHub Actions; (7) Cypress Cloud parallel execution across 3 machines with automatic spec balancing; (8) Custom Mochawesome + mochawesome-merge HTML reports with embedded screenshots; (9) Flaky test retry with retries: { runMode: 2, openMode: 0 }; (10) Cypress Studio recorded interactions as test scaffolding starting point; (11) Network throttling simulation with cy.intercept() delay option for performance-sensitive flows; (12) Accessibility assertions using cypress-axe on every cy.visit(). Generate 20+ tests covering auth, e-commerce cart, admin dashboard, form validation, and file upload flows.'
      },
      {
        id: 'selenium-java',
        name: 'Selenium with Java',
        description: 'Industry-standard web automation using Java, TestNG, and Page Factory.',
        prompt: 'Build an enterprise-grade Selenium WebDriver framework in Java using TestNG, as used by large QA teams at banks, insurers, and healthcare companies. Include: (1) Page Factory pattern with @FindBy annotations and AjaxElementLocatorFactory for dynamic SPAs; (2) WebDriverManager auto-download for Chrome, Firefox, Edge, Safari browser binaries; (3) ThreadLocal<WebDriver> for thread-safe parallel execution — critical for TestNG parallel="methods"; (4) Custom FluentWait utilities with custom ExpectedConditions for AJAX-heavy pages; (5) Data-driven tests using TestNG @DataProvider loading CSV/Excel test data with Apache POI; (6) ExtentReports v5 with screenshots on step pass/fail and execution timeline dashboard; (7) Soft assertions using SoftAssert for collecting multiple failures per test; (8) Testcontainers Selenium Grid 4 — ephemeral Chrome/Firefox nodes per CI run; (9) Screenshot and video recording on failure via EventFiringWebDriver listener; (10) REST API layer using RestAssured for test precondition setup; (11) Maven Surefire parallel execution with configurable thread count; (12) GitHub Actions matrix for multi-browser execution + Allure report publish to GitHub Pages. Generate 20+ tests for banking login, transfer, statement, admin, and form validation flows with TestNG XML suites.'
      },
      {
        id: 'webdriverio-ts',
        name: 'WebdriverIO with TypeScript',
        description: 'Next-gen browser automation with built-in Appium support.',
        prompt: 'Build a WebdriverIO 8+ testing framework in TypeScript as used by teams running Appium + web hybrid test suites. Include: (1) Page Object Model with TypeScript classes extending BasePage with $() and $$() selector wrappers; (2) wdio.conf.ts with multiple capability sets: desktop Chrome, Firefox, BrowserStack iOS Safari, BrowserStack Android Chrome; (3) @wdio/visual-service for visual regression screenshots with ignore regions config; (4) Mock service via browser.mock() and respondWith() for API response stubbing; (5) Custom reporters: Allure HTML with screenshots, JUnit XML for CI; (6) wdio-intercept-service for network request assertion (verify correct API calls made with expected payloads); (7) Appium integration — same test suite running on web and iOS Simulator via shared page objects; (8) BrowserStack App Automate capabilities with buildName/sessionName tagging; (9) Accessibility: @axe-core/webdriverio integration on every page; (10) Parallel execution with maxInstances: 5, separate services per worker; (11) Database seeding via REST API or direct DB calls in onPrepare hook; (12) GitHub Actions pipeline deploying to BrowserStack with PR status check. Generate 20+ cross-platform tests for login, navigation, forms, and mobile gestures.'
      },
      {
        id: 'playwright-python',
        name: 'Playwright with Python',
        description: 'Python-based browser automation for teams preferring Python stack.',
        prompt: 'Build a production-grade Playwright Python testing framework using pytest-playwright, as used by Python-first teams at data companies and ML platforms. Include: (1) Page Object Models as Python classes with @property selectors and typed method signatures; (2) pytest fixtures for browser, context, and page with configurable scope (session/module/function); (3) conftest.py with authenticated context fixture that creates browser storage state once and reuses across all tests; (4) pytest.mark parametrize for data-driven tests across multiple user roles and locales; (5) allure-pytest integration with @allure.step, @allure.attach for screenshots and page source; (6) pytest-xdist parallel execution (-n auto) with BaseContext fixture isolation per worker; (7) Playwright API request context for test precondition setup without UI; (8) network route interceptors using page.route() for mocking slow external APIs; (9) GitHub Actions matrix strategy with browser: [chromium, firefox, webkit] running pytest --browser for each; (10) pytest-html report with embedded screenshots on failure; (11) Accessibility scan with axe-playwright-python on every page.goto(); (12) environment configuration via .env files loaded with python-dotenv. Generate 20+ tests for SaaS dashboard, API-backed forms, authentication flows, and data table interactions.'
      },
      {
        id: 'playwright-component',
        name: 'Playwright Component Testing',
        description: 'Isolated component-level testing using Playwright CT mode for React, Vue, and Svelte.',
        prompt: 'Build a Playwright Component Testing framework using @playwright/experimental-ct-react (or Vue/Svelte variant). Include isolated component mount fixtures, props/slot injection tests, event emission assertions, visual snapshot comparisons per component, accessibility checks via axe-core, coverage mapping to source components, and GitHub Actions integration with parallel shard execution.'
      },
      {
        id: 'testcafe',
        name: 'TestCafe (No WebDriver)',
        description: 'WebDriver-free cross-browser E2E testing with built-in concurrency and CSS selectors.',
        prompt: 'Create a TestCafe E2E testing framework. Include Page Model pattern with TypeScript, built-in wait mechanisms for dynamic elements, concurrent cross-browser execution (Chrome, Firefox, Safari), request hooks for API mocking, test roles for multi-user scenarios, screenshot and video capture on failure, and GitHub Actions matrix for parallel browser runs.'
      },
      {
        id: 'browserstack-grid',
        name: 'BrowserStack / LambdaTest Cross-Browser Grid',
        description: 'Cloud grid integration for parallel cross-browser and cross-OS execution.',
        prompt: 'Build a cloud cross-browser testing framework integrating BrowserStack Automate or LambdaTest with Playwright/WebdriverIO. Include capability matrices for browser/OS/device combinations, parallel session management, build tagging and run grouping, automatic video and network log capture, flaky test detection via smart re-run, and CI/CD integration with status badge reporting.'
      },
      {
        id: 'selenium-python-pom',
        name: 'Selenium Python — Page Object Model',
        description: 'pytest-selenium with Page Object Model, explicit waits, and parallel grid execution.',
        prompt: 'Build a production-grade Selenium WebDriver testing framework in Python using pytest. Include: (1) Page Object Model (POM) with BasePage class containing common wait strategies (explicit waits, expected_conditions, fluent waits with polling); (2) pytest-selenium plugin integration with browser factory fixture (Chrome, Firefox, Edge, Safari via WebdriverManager); (3) pytest-xdist for parallel test execution with isolated WebDriver instances per worker; (4) Selenium Grid 4 configuration for distributed execution; (5) Data-driven tests using @pytest.mark.parametrize with CSV/JSON test data files; (6) Screenshot on failure fixture with base64 embedding in HTML report; (7) pytest-html / Allure report integration; (8) Soft assertions using pytest-check; (9) Shadow DOM interaction utilities; (10) Visual diff assertions using pixelmatch or PIL; (11) GitHub Actions matrix strategy for browser combinations; (12) conftest.py with browser fixtures, test data factories, and cleanup. Include requirements.txt and pytest.ini.'
      },
      {
        id: 'stagehand-ai-testing',
        name: 'Stagehand AI — Agent-Driven Web Testing',
        description: 'AI-powered browser automation using Stagehand (Browserbase) for natural language test actions.',
        prompt: 'Build an AI-driven web testing framework using Stagehand by Browserbase and OpenAI/Anthropic vision models. Include: (1) Stagehand act() and extract() calls using natural language instructions (e.g., act("Click the checkout button"), extract("Get the order confirmation number")); (2) Playwright integration for traditional selector-based assertions alongside AI actions; (3) Self-healing test patterns — when a selector breaks, use Stagehand to find the element by visual description; (4) Observe() for AI-assisted assertion generation; (5) Multi-step user journey tests expressed entirely in natural language; (6) Structured data extraction tests with Zod schema validation; (7) Session recording and replay for debugging; (8) Cost-aware test design — minimize LLM calls by caching stable selectors; (9) Comparison tests: AI action vs deterministic selector to measure drift; (10) GitHub Actions integration with Browserbase cloud sessions. Include TypeScript setup and example test suite for e-commerce flows.'
      },
      {
        id: 'taiko-gauge-testing',
        name: 'Taiko / Gauge BDD Streaming Tests',
        description: 'Gauge BDD specification tests with Taiko JavaScript API for high-reliability browser automation.',
        prompt: 'Build a Gauge BDD + Taiko browser testing framework. Include: (1) Gauge specification files (.spec) with business-readable steps organized by user journey; (2) Taiko step implementations — goto(), click(), type(), write(), press(), dropDown(), checkBox(), radioButton(), fileField() with smart selectors (text, CSS, XPath, proximity); (3) Taiko waitFor() and to() assertion patterns; (4) Headless and headed mode configuration; (5) Custom Taiko plugin for network interception and request mocking; (6) Screenshot capture on step failure; (7) Gauge HTML, XML, and JSON reporters; (8) Parallel execution via Gauge environment + Taiko connection pooling; (9) Page Store (Gauge concept files) for shared data across steps; (10) Data tables in spec files for data-driven scenarios; (11) CI configuration with gauge run --parallel; (12) Integration with Taiko REPL for exploratory testing. Include npm setup, .gauge config, and sample e-commerce spec.'
      },
      {
        id: 'multi-window-multi-tab-testing',
        name: 'Multi-Window & Multi-Tab Testing Patterns',
        description: 'Deep-dive framework for popup windows, new tabs, OAuth flows, and cross-origin iframes.',
        prompt: 'Build a comprehensive multi-window and multi-tab testing framework using Playwright and Selenium. Include: (1) Playwright context.waitForEvent("page") for new tab detection and switching; (2) Popup window handling for print dialogs, alert/confirm/prompt modals, and file download dialogs; (3) OAuth 2.0 popup flow tests — trigger SSO popup, complete login in popup window, assert token received in parent; (4) Cross-origin iframe interaction with Playwright frameLocator() and Selenium switchTo().frame(); (5) File upload and download assertion patterns (download event capture, file size and MIME type assertions); (6) Browser storage isolation tests between tabs (localStorage, sessionStorage, cookies); (7) Cross-tab communication tests (BroadcastChannel API, SharedWorker); (8) Print preview dialog handling and PDF content assertions; (9) Browser permission handling (geolocation, notifications, camera/mic mock); (10) Window resize and responsive breakpoint tests. Include reusable helpers for each pattern and conftest.py fixtures.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 2. ETL & Data Pipeline Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'etl-testing',
    name: 'ETL & Data Pipeline Testing',
    description: 'Validate data transformations, schema checks, data quality, and pipeline integrity.',
    icon: 'Database',
    category: 'etl',
    collection: 'data-ai',
    domains: [
      'Banking & Finance', 'Healthcare / Pharma', 'Insurance', 'HR / Payroll',
      'Master Data Management (MDM)', 'Retail & E-Commerce', 'Telecom',
      'Manufacturing & Supply Chain', 'Government / Public Sector',
      'Media & Streaming', 'Energy & Utilities'
    ],
    subTemplates: [
      {
        id: 'mdm-informatica',
        name: 'MDM - Informatica / Multi-Source Validation',
        description: 'End-to-end MDM testing tool with source selection, environment config, mapping-driven validation, and mismatch reporting.',
        prompt: `Build a professional MDM Data Validation Tool as a Streamlit application that mirrors a real enterprise MDM testing framework used by specialists at firms like Deloitte, Accenture, and PwC.

TOOL ARCHITECTURE — multi-step wizard UI in Streamlit:

STEP 1 — Source System Selection:
  Sidebar or top-of-page selector with icons for each source:
  - SAP S/4HANA (ECC tables: MARA, KNA1, LFA1, MARC)
  - SAP SuccessFactors (Employee Central: PerPerson, PerPersonal, EmpJob, PerEmail)
  - Informatica MDM Hub (C_REPOS, XREF tables, hub store tables)
  - Snowflake DWH (staging → curated → consumption layer tables)
  - Oracle / SQL Server relational DB
  - Flat Files (CSV / Excel / Pipe-delimited)
  - Aspire (custom integration tables)
  st.selectbox or st.radio with source icons as st.image or emoji prefix

STEP 2 — Environment Selection:
  Environment pills: DEV | QA | STAGING | PROD
  Use st.radio with horizontal layout; colour each pill (green=PROD, amber=STAGING, blue=QA, grey=DEV)
  Show a connection-config card: server, database, schema (read from config dict keyed by env)

STEP 3 — Configuration Loading (simulated Excel-driven):
  Simulate reading an Excel mapping workbook with two sheets:
    Sheet "Connections": columns [env, source_type, server, database, schema, username]
    Sheet "Mappings": columns [source_table, source_column, target_table, target_column, transformation_rule, is_key_column, validation_type]
  Generate this mock data as inline pandas DataFrames (do NOT actually read a file — show sample)
  Display the mapping table with st.dataframe; allow column filter with st.multiselect

STEP 4 — Table & Column Selection:
  Derive available source tables from the selected source + mock mappings
  st.selectbox for table selection
  st.multiselect for column selection (pre-populated from mapping sheet)
  Show a "Mapping Preview" expander with source→target column pairs

STEP 5 — Run Validation (Run Job button):
  st.button("▶ Run Validation", type="primary") triggers all checks:

  A. METADATA VALIDATION
     - Column name match between source and target schemas
     - Data type compatibility check
     - Nullable vs NOT NULL constraint comparison
     - Primary key / unique key presence
     Display as: st.dataframe with status column (✅ Match / ⚠️ Type Mismatch / ❌ Missing)

  B. DATA COUNT CHECKS
     - Total row count: source vs target
     - Count by key segment (e.g., by record_type, country_code, status)
     - Orphan records check (source rows with no target match)
     - Duplicate key detection in both source and target
     Display as Plotly grouped bar chart (source vs target counts by segment) + summary table

  C. DATA CORRECTNESS / VALUE VALIDATION
     - Null rate per column (source vs target)
     - Distinct value count comparison
     - Sample value mismatch (10 random rows showing source vs target value side by side)
     - Business rule assertions (e.g., effective_date <= expiry_date, amount > 0)
     Display as colour-coded comparison table: green=match, red=mismatch, amber=partial

  D. MISMATCH REPORT
     - Aggregate all mismatches into a summary DataFrame
     - st.download_button to export as Excel (.xlsx) with:
         Sheet 1: Summary (counts by check type)
         Sheet 2: Metadata mismatches
         Sheet 3: Count mismatches
         Sheet 4: Value mismatches with source/target columns side by side
     Button label: "📥 Download Mismatch Report (.xlsx)"

DASHBOARD HEADER:
  - Project name, selected source, environment badge, run timestamp
  - KPI row: Total Checks | Passed | Failed | Warnings | Pass Rate %
  - Use st.metric for KPIs with delta arrows

STYLING:
  - Custom CSS injected via st.markdown for dark header bar, coloured env badges, card containers
  - st.progress bar during "run" simulation
  - Expandable result sections with st.expander

ALSO GENERATE (as separate files with filename comments):
  - config/connections.py — connection config dict keyed by env and source type
  - config/mappings.py — sample mapping DataFrame factory for each source type
  - validators/metadata_validator.py — MetadataValidator class with real SQLAlchemy logic (for non-Streamlit use)
  - validators/count_validator.py — CountValidator class
  - validators/value_validator.py — ValueValidator class with configurable tolerance thresholds
  - validators/mismatch_reporter.py — MismatchReporter class that writes Excel via openpyxl
  - tests/test_validators.py — pytest unit tests for each validator class with mock DB fixtures
  - requirements.txt — pinned versions: streamlit, pandas, numpy, plotly, sqlalchemy, openpyxl, pytest, faker
  - README.md — setup, Excel template format, how to add a new source system
  - .github/workflows/ci.yml — GitHub Actions: lint (flake8), test (pytest), coverage badge

All mock data must be realistic for an MDM context: use real-looking entity names (Customer, Product, Supplier, Employee), realistic column names (CUSTOMER_ID, FIRST_NAME, LAST_NAME, EMAIL, COUNTRY_CODE, EFFECTIVE_DATE, etc.), and plausible mismatch scenarios.`
      },
      {
        id: 'great-expectations',
        name: 'Great Expectations',
        description: 'Declarative data quality framework with auto-generated data docs.',
        prompt: 'Build a data quality testing framework using Great Expectations. Include expectation suites for schema validation, referential integrity, null checks, distribution checks, and custom SQL-based expectations. Add data docs generation, Slack alerting, and integration with Airflow/dbt.'
      },
      {
        id: 'dbt-testing',
        name: 'dbt (Data Build Tool) Testing',
        description: 'Analytics engineering testing for dbt models and sources.',
        prompt: 'Build a comprehensive testing strategy for a dbt project. Include generic tests (unique, not_null, accepted_values, relationships), custom singular tests for complex business logic, dbt-expectations for statistical assertions, freshness checks, and integration with dbt Cloud CI jobs.'
      },
      {
        id: 'big-data-pyspark',
        name: 'Big Data - PySpark',
        description: 'Testing framework for large-scale Spark data processing pipelines.',
        prompt: 'Create a Big Data testing framework using PySpark and pytest. Include unit tests for Spark transformations using chispa for DataFrame equality, schema validation, handling skewed data, mock SparkSession fixtures, edge-case scenarios for large datasets, and pipeline integration tests.'
      },
      {
        id: 'python-pandas-pytest',
        name: 'Python / Pandas Data Testing',
        description: 'Flexible ETL validation using Python, Pandas, and pytest.',
        prompt: 'Build a Python-based ETL testing framework using pytest and Pandas. Include fixtures for CSV/JSON/Parquet source ingestion, schema comparison, row count checks, null detection, data type validation, duplicate analysis, referential integrity, and Allure HTML reporting.'
      },
      {
        id: 'sql-server-validations',
        name: 'SQL Server Validations',
        description: 'Direct database testing for stored procedures, views, and ETL jobs.',
        prompt: 'Create a SQL Server validation framework using tSQLt and a Python/pytest wrapper. Include stored procedure unit tests, view output validation, referential integrity checks, SCD Type 2 testing, CDC validation, and performance benchmarking with execution plan analysis.'
      },
      {
        id: 'spark-structured-streaming',
        name: 'Spark Structured Streaming Tests',
        description: 'Unit and integration tests for PySpark streaming pipelines using MemoryStream.',
        prompt: 'Build a Spark Structured Streaming testing framework using PySpark and pytest. Include MemoryStream-based micro-batch unit tests, watermark and late-data handling assertions, stateful aggregation output validation, schema enforcement checks, checkpointing recovery tests, Delta Lake ACID transaction assertions, and GitHub Actions integration with a local Spark cluster fixture.'
      },
      {
        id: 'dbt-unit-testing',
        name: 'dbt Macro & Unit Testing',
        description: 'Unit tests for dbt macros and native unit_tests blocks (dbt 1.8+).',
        prompt: 'Create a dbt testing framework combining the dbt-unit-testing package and native unit_tests blocks (dbt 1.8+). Include macro unit tests with input mocking, model-level unit tests with given/expected CSV fixtures, singular data tests for business rule assertions, schema tests for source freshness and uniqueness, slim CI diff-aware runs with dbt state, and test result reporting to Slack via dbt Cloud webhooks.'
      },
      // Cloud Platform ETL
      {
        id: 'azure-data-factory',
        name: 'Azure Data Factory (ADF) Testing',
        description: 'End-to-end pipeline validation for ADF Copy, Dataflow, and trigger-based orchestration.',
        prompt: 'Build a comprehensive Azure Data Factory testing framework. Include: (1) unit tests for ADF Mapping Data Flows via the debug session REST API (trigger run, poll status, assert row counts and column values); (2) pipeline integration tests using the azure-mgmt-datafactory SDK — create test pipelines via IaC, run them, assert activity run outcomes and output dataset row counts; (3) linked service connectivity tests (Azure SQL, Blob, ADLS Gen2, on-prem gateway); (4) trigger validation (schedule, tumbling-window, event-based trigger configuration tests); (5) parameterised pipeline tests with environment-specific configs; (6) copy activity schema-drift detection assertions; (7) error-handling path tests (retry count, fault tolerance on bad rows); (8) Azure Monitor pipeline run query for duration SLA assertions; (9) pytest fixture for service principal auth; (10) GitHub Actions pipeline deploying ARM templates to test resource group, running tests, then tearing down. Include README and requirements.txt.'
      },
      {
        id: 'azure-synapse-testing',
        name: 'Azure Synapse Analytics Testing',
        description: 'Pipeline, Spark pool, dedicated SQL pool, and Synapse Link validation framework.',
        prompt: 'Build an Azure Synapse Analytics testing framework. Include: (1) Synapse Pipeline tests using the azure-synapse-artifacts SDK — run pipelines, poll status, assert activity outputs; (2) Dedicated SQL Pool tests: stored procedure unit tests with tSQLt, distribution and partition correctness assertions, columnstore index rebuild validation; (3) Apache Spark Pool notebook tests using pytest-notebook — execute notebooks with parameter injection, assert output dataframe shapes and column values; (4) Synapse Link for Cosmos DB — verify analytical store freshness and row counts; (5) Data Explorer KQL pool query tests; (6) Workspace-level integration runtime and linked service connectivity tests; (7) Security tests: managed private endpoint visibility, column-level encryption; (8) Git integration pipeline: ARM template deploy, run full test suite, destroy. Include Terraform modules for test environment provisioning.'
      },
      {
        id: 'azure-databricks-testing',
        name: 'Azure Databricks & Delta Live Tables Testing',
        description: 'Unit, integration, and Delta Live Tables pipeline tests for the Databricks Lakehouse.',
        prompt: 'Build an Azure Databricks testing framework using pytest, Databricks Connect, and the Databricks SDK. Include: (1) notebook unit tests via dbutils.notebook.run with parameter injection and return value assertion; (2) Databricks job integration tests — submit job runs via SDK, poll until complete, assert output data in Unity Catalog or ADLS; (3) Delta Live Tables (DLT) pipeline tests — trigger DLT pipeline update, assert expectations (data quality rules) pass rate, validate output table row counts; (4) Unity Catalog table and permission tests; (5) PySpark transformation unit tests with Databricks Connect or local PySpark fallback; (6) Auto Loader incremental ingestion tests (push test files to ADLS, assert records appear in Delta table within SLA); (7) DBU consumption assertions per job run; (8) Terraform-based test cluster provisioning; (9) GitHub Actions workflow with Databricks CLI. Include cluster fixture, token rotation helper, and test data cleanup.'
      },
      {
        id: 'aws-glue-testing',
        name: 'AWS Glue ETL Testing',
        description: 'Unit and integration tests for AWS Glue PySpark jobs, DataBrew recipes, and crawlers.',
        prompt: 'Build an AWS Glue ETL testing framework using pytest and moto. Include: (1) Glue PySpark job unit tests using GlueContext mock — extract DynamicFrame transformations into pure PySpark functions tested with chispa; (2) integration tests using moto to mock S3, Glue Catalog, and DynamoDB; (3) Glue Crawler tests — trigger crawler run via boto3, assert catalog table schema matches expected; (4) Glue DataBrew recipe tests — apply recipe to sample dataset, assert output column transformations; (5) Glue Data Quality Ruleset tests (COMPLETENESS, UNIQUENESS, COLUMN_VALUES_BETWEEN rules); (6) Job bookmark tests — verify incremental load tracking processes only new records; (7) Glue Workflows step-by-step trigger chain tests; (8) IAM role permission boundary tests; (9) GitHub Actions workflow with moto fixtures. Include requirements.txt and Makefile.'
      },
      {
        id: 'amazon-redshift-testing',
        name: 'Amazon Redshift / Redshift Serverless Testing',
        description: 'Schema, query, stored procedure, and Spectrum validation for Redshift DWH.',
        prompt: 'Build an Amazon Redshift testing framework using pytest and psycopg2. Include: (1) stored procedure unit tests with setup/teardown using temp tables and schema isolation; (2) distribution key and sort key effectiveness tests — EXPLAIN plan analysis, assert no DS_BCAST_INNER cross-node broadcasts; (3) Redshift Spectrum external table tests via Glue Catalog — query S3 Parquet/ORC data and assert row counts; (4) materialized view freshness tests; (5) Column-level encoding tests (ZSTD compression, skew ratio checks); (6) Redshift Data API async query execution in tests; (7) Redshift Serverless workgroup capacity and concurrency scaling tests; (8) STL/STV system table diagnostics for slow-query regression detection; (9) Testcontainers with LocalStack for unit-level testing; (10) GitHub Actions with Redshift Serverless ephemeral namespace. Include connection pooling helper and conftest.py.'
      },
      {
        id: 'google-bigquery-testing',
        name: 'Google BigQuery Testing (ZetaSQL / pytest)',
        description: 'BigQuery SQL unit tests, view assertions, stored procedure tests, and BQML model validation.',
        prompt: 'Build a Google BigQuery testing framework using pytest and the google-cloud-bigquery Python client. Include: (1) SQL unit tests using BigQuery scripting ASSERT statements executed via BQ client; (2) Routine (stored procedure and function) tests — call routines with test inputs, assert return values; (3) View query tests — create temp base tables, query views, assert output; (4) BigQuery ML model tests — BQML training, ML.EVALUATE assertions (accuracy/RMSE thresholds); (5) Scheduled Query tests via INFORMATION_SCHEMA.JOBS; (6) Streaming insert deduplication tests; (7) Partitioned and clustered table query bytes-billed assertions; (8) Column-level security (masking policy) enforcement tests; (9) pytest fixtures for project isolation (test dataset creation/teardown per run); (10) GitHub Actions workflow with Workload Identity Federation for keyless auth. Include Makefile and dataset naming convention guide.'
      },
      {
        id: 'snowflake-testing',
        name: 'Snowflake Data Quality & Snowpark Testing',
        description: 'Snowpark Python testing, stored procedure validation, Dynamic Table freshness, and Stream/Task tests.',
        prompt: 'Build a Snowflake testing framework using Snowpark Python and pytest. Include: (1) Snowpark DataFrame transformation unit tests with local mock sessions; (2) Stored procedure tests (JavaScript and Snowpark) executed via snowflake-connector-python; (3) Dynamic Table freshness assertion (TARGET_LAG compliance tests); (4) Stream and Task tests — insert records into source, trigger task manually, assert STREAM CONSUME produces expected output; (5) Time Travel tests — verify data accessible AT and BEFORE specific timestamps; (6) Row Access Policy and Column Masking Policy enforcement tests against different roles; (7) Snowpipe ingestion lag measurement tests; (8) Great Expectations Snowflake dialect integration; (9) pytest fixtures for role switching, warehouse sizing, and database cloning for test isolation; (10) GitHub Actions workflow with Snowflake secrets from GitHub OIDC. Include conftest.py and connection helper.'
      },
      // Data Warehouse Specific Patterns
      {
        id: 'scd-testing',
        name: 'Slowly Changing Dimensions (SCD) Testing',
        description: 'Automated validation for SCD Type 1, 2, 3, 4, and 6 logic in any SQL DWH.',
        prompt: 'Build a Slowly Changing Dimensions (SCD) testing framework in Python using pytest and SQLAlchemy. Include: (1) SCD Type 1 (overwrite) tests — verify old value replaced, no history record created, updated_at refreshed; (2) SCD Type 2 (history rows) tests — verify new surrogate key generated, previous row closed (effective_end_date set, is_current=false), new row opened with is_current=true; (3) SCD Type 2 late-arriving data tests — out-of-order record inserts correctly in history chain; (4) SCD Type 3 (previous value column) tests; (5) SCD Type 4 (mini-dimension/history table) tests; (6) SCD Type 6 (hybrid 1+2+3) validation; (7) Surrogate key generation uniqueness tests; (8) Natural key deduplication tests; (9) Source distinct key count reconciliation vs dimension member count; (10) Re-run idempotency tests — running the SCD load twice produces no duplicate rows; (11) Database-agnostic SQL execution (PostgreSQL, SQL Server, Snowflake, BigQuery adapters). Include fixture factories for each SCD type scenario.'
      },
      {
        id: 'data-vault-testing',
        name: 'Data Vault 2.0 Testing Framework',
        description: 'Hub, Link, Satellite, PIT, and Bridge table validation for Data Vault 2.0 architectures.',
        prompt: 'Build a Data Vault 2.0 testing framework using pytest, SQLAlchemy, and dbtvault integration. Include: (1) Hub tests — business key uniqueness, hash key determinism, record source population, load_date ordering; (2) Link tests — all referenced hub hash keys exist, composite business key deduplication, multi-active link handling; (3) Satellite tests — hashdiff calculation correctness, end-dating accuracy when record changes, ghost/default record presence, multi-active satellite latest record identification; (4) Point-in-Time (PIT) table tests — correct pit snapshot row per business key per snapshot date; (5) Bridge table tests — correct flattening of link-satellite joins; (6) Effectivity Satellite open/close record pairs validation; (7) Raw Vault to Business Vault transformation assertion tests; (8) Idempotency tests — full reload produces identical Data Vault structures; (9) dbtvault macro tests with mock sources; (10) Source-to-Raw Vault count reconciliation. Include SQL assertion helpers per vault type.'
      },
      {
        id: 'star-schema-testing',
        name: 'Star Schema / Dimensional Model Testing',
        description: 'Fact table grain, dimension FK integrity, conformed dimension, and aggregate assertion tests.',
        prompt: 'Build a star schema dimensional model testing framework using Python, pytest, and SQLAlchemy. Include: (1) Fact table grain tests — each row represents exactly the declared grain, duplicate fact row detection; (2) Dimension foreign key integrity tests — every FK in fact table resolves to an active dimension member; (3) Date dimension completeness tests — all dates from min to max load date present, no gaps; (4) Conformed dimension tests — dimension used across multiple fact tables returns consistent members; (5) Measure non-negativity tests (revenue, quantity, cost cannot be negative without business justification); (6) Additive vs semi-additive fact validation (balance facts not summed across time); (7) SCD integration tests with fact table version-correct joins; (8) Fact aggregation reconciliation — sum of granular fact equals rollup layer value; (9) Degenerate dimension completeness tests; (10) Zero-row result scenario tests. Include a DWH catalogue document generator.'
      },
      {
        id: 'source-to-target-reconciliation',
        name: 'Source-to-Target Reconciliation (STR) Framework',
        description: 'Row count, checksum, field-level, and statistical reconciliation between source and target for any ETL load.',
        prompt: 'Build a comprehensive source-to-target reconciliation (STR) framework in Python using SQLAlchemy and pytest. Include: (1) row count comparison per table with configurable tolerance thresholds; (2) column-level checksum comparison (MD5 or SHA256 of ordered column values); (3) field-level reconciliation report — sample N random records per table, compare every mapped column value side-by-side with diff highlighting; (4) NULL rate change detection — alert when null% in target differs from source beyond threshold; (5) numeric aggregate comparison (SUM, MIN, MAX, AVG per key metric column with tolerance %); (6) Duplicate detection — count distinct key vs total rows in source and target; (7) Referential integrity cross-system check; (8) Date range coverage test; (9) Rejected rows audit — count records in error/reject tables and surface first 10 examples; (10) HTML reconciliation dashboard (per-table PASS/WARN/FAIL with drill-down); (11) Multi-database adapter pattern (PostgreSQL, SQL Server, Snowflake, BigQuery, Redshift via SQLAlchemy); (12) YAML configuration file for mapping definitions; (13) GitHub Actions scheduled nightly reconciliation run. Include sample mapping YAML.'
      },
      // Legacy Enterprise ETL
      {
        id: 'ssis-testing',
        name: 'SSIS (SQL Server Integration Services) Testing',
        description: 'Package unit tests, data flow validation, and CI execution for SSIS ETL projects.',
        prompt: 'Build an SSIS ETL testing framework. Include: (1) ssisUnit XML-based package unit tests — test individual tasks and data flows with mock connection managers; (2) Control flow task validation (Execute SQL Task, Script Task, For Each Loop) with mocked source/destination tables; (3) Data Flow component tests — validate transformations (Derived Column, Lookup, Conditional Split, Aggregate); (4) Connection manager environment variable substitution tests for dev/staging/prod; (5) Package parameter and variable injection tests; (6) Error output path tests — ensure bad rows flow to error outputs correctly; (7) Transaction scope and rollback tests; (8) Performance row throughput assertions for large data flow paths; (9) SSIS catalog deployment tests via PowerShell; (10) Azure Data Factory SSIS Integration Runtime execution tests; (11) Azure DevOps pipeline YAML for automated package testing. Include Visual Studio project template and ssisUnit test XML examples.'
      },
      {
        id: 'cdc-debezium-testing',
        name: 'CDC Testing (Debezium / Oracle GoldenGate)',
        description: 'Change data capture pipeline tests for insert, update, delete event capture and schema evolution.',
        prompt: 'Build a Change Data Capture (CDC) testing framework using Debezium, Testcontainers, and pytest. Include: (1) Debezium connector setup with Testcontainers (PostgreSQL or MySQL source, Kafka sink — fully isolated per test run); (2) INSERT event capture tests — trigger insert on source, assert correct after payload on Kafka topic; (3) UPDATE event capture tests — assert before/after payload, operation type, LSN/offset progression; (4) DELETE event capture tests — assert tombstone message produced, before payload present; (5) Schema evolution tests — add column to source table, assert schema registry updates; (6) Transaction boundary tests — multi-statement transaction produces atomic event batch; (7) Initial snapshot tests — connector startup produces full table snapshot events; (8) Heartbeat and idle partition handling tests; (9) Dead letter queue (DLQ) tests for malformed events; (10) Consumer lag monitoring assertions; (11) Kafka Streams CDC consumer tests; (12) Reconnect and resume from last offset tests after connector restart. Include Docker Compose test environment.'
      },
      {
        id: 'informatica-cloud-testing',
        name: 'Informatica Cloud (IDMC / IICS) Testing',
        description: 'REST API-driven testing for IICS mappings, taskflows, and data quality rules.',
        prompt: 'Build an Informatica Intelligent Cloud Services (IICS/IDMC) testing framework using pytest and the IICS REST API. Include: (1) Mapping task execution tests — trigger mapping task via IICS REST API, poll status until complete, assert status=Success and output row count within expected range; (2) Taskflow execution tests — execute taskflow, assert each embedded mapping task status and sequence; (3) Data Integration mapping validation — trigger preview run with test source data, assert output transformation correctness; (4) Data Quality (IDQ) rule tests — apply data quality rules to sample dataset via API, assert DQ score and exception counts; (5) Connection tests — verify source and target connections active before running tests; (6) Error log parsing — download task logs via API, assert no ERROR entries; (7) Scheduling tests — verify scheduled tasks are enabled and configured; (8) Parameterised mapping tests — inject runtime parameters and assert parameter-specific outputs; (9) Mass Ingestion task snapshot and incremental mode tests; (10) GitHub Actions pipeline with IICS service account token rotation. Include conftest.py with IICS session management.'
      },
      {
        id: 'talend-etl-testing',
        name: 'Talend ETL Job Testing',
        description: 'Component-level and job-level testing for Talend Open Studio and Talend Cloud jobs.',
        prompt: 'Build a Talend ETL testing framework. Include: (1) Talend job unit tests using tInMemory component pattern — replace tFileInput/tDBInput with tRowGenerator for in-memory test data; (2) tAssert component-based assertion tests embedded within the job context; (3) Java JUnit tests for custom Talend Java Routines using Maven; (4) Talend Job API invocation tests — trigger job execution via Talend Administration Center REST API, assert job run status; (5) tLogCatcher error count assertions — parse job log output for ERROR severity entries; (6) Data flow transformation validation — expected output schema, row count, and value assertions per tMap transformation; (7) Rejection flow tests — verify tReject component captures bad records correctly; (8) Parameterised context variable tests (dev/staging/prod context groups); (9) Talend CI/CD: CommandLine build and job JAR execution in GitHub Actions; (10) Performance tests — job execution duration and throughput row/second assertions. Include Maven POM template and job test scaffold.'
      },
      // Modern Streaming and Lakehouse
      {
        id: 'apache-flink-testing',
        name: 'Apache Flink Streaming Testing',
        description: 'Unit tests for Flink operators, watermark handling, stateful functions, and CEP patterns.',
        prompt: 'Build an Apache Flink streaming testing framework (Java/Scala or PyFlink). Include: (1) Operator unit tests using MiniClusterWithClientResource — single-node Flink cluster for fast integration tests; (2) DataStream and Table API transformation unit tests with CollectSink assertions; (3) Watermark and late-data handling tests — controlled event-time generators, assert out-of-order records handled correctly within allowed lateness; (4) Windowing tests (Tumbling, Sliding, Session windows) — feed events, advance watermark past window, assert trigger and output; (5) Stateful operator tests — inject events, checkpoint, restore from checkpoint, assert state preserved; (6) Complex Event Processing (CEP) pattern tests with PatternStream; (7) Kafka source/sink integration tests with Testcontainers; (8) Flink SQL tests using TableEnvironment with in-memory sources; (9) Savepoint and stateful upgrade tests; (10) Exactly-once semantics tests — simulate Kafka producer failure, assert no duplicates; (11) GitHub Actions with embedded Flink MiniCluster. Include POM and test utility helpers.'
      },
      {
        id: 'iceberg-hudi-lakehouse',
        name: 'Apache Iceberg / Apache Hudi Lakehouse Testing',
        description: 'ACID transaction, time-travel, schema evolution, and partition evolution tests for open table formats.',
        prompt: 'Build an open lakehouse table format testing framework covering Apache Iceberg and Apache Hudi using PySpark and pytest. Include: (1) Iceberg CRUD tests with row-level ACID validation (INSERT, UPDATE, MERGE INTO, DELETE); (2) Iceberg time-travel tests — query table AS OF snapshot ID and AS OF timestamp; (3) Iceberg schema evolution tests — add column, rename column, drop column — assert existing data readable; (4) Iceberg partition evolution tests — change partition spec without rewriting data; (5) Iceberg table branch and tag tests; (6) Hudi COW (Copy on Write) and MOR (Merge on Read) table type tests; (7) Hudi incremental query tests — query records changed since begin.instanttime; (8) Hudi compaction trigger and file sizing tests; (9) Z-ordering and clustering optimisation assertion tests; (10) Concurrent write and OCC conflict detection tests; (11) Iceberg REST Catalog and Glue Catalog registration tests; (12) Testcontainers with local MinIO for storage isolation. Include SparkSession fixture and sample DML scripts.'
      },
      // Data Observability and Quality
      {
        id: 'soda-core-observability',
        name: 'Soda Core / Elementary / Monte Carlo Observability',
        description: 'Automated data observability checks for freshness, volume, schema, and distribution anomalies.',
        prompt: 'Build a data observability testing framework using Soda Core, Elementary, and Monte Carlo. Include: (1) Soda Core SodaCL scan configuration with checks for row count range, freshness (last_modified < 24 hours), schema validity (column presence, data type, nullable), and duplicate rate (duplicate_percent < 0.1%); (2) Custom Soda checks using SQL expressions for business rules; (3) Soda Cloud integration — push scan results and assert monitor alert status via API; (4) Elementary dbt package integration — run dbt-elementary after each dbt run, assert zero anomaly_detected rows in result tables; (5) Elementary report generation and Slack/email notification; (6) Monte Carlo data observability API tests — verify circuit breaker rules, query incident history, assert SLO thresholds; (7) Cross-table consistency checks; (8) Automated alert routing — critical failures to PagerDuty, warnings to Slack; (9) GitHub Actions scheduled observability scan with failure gate; (10) Observability coverage report showing percentage of tables with freshness, volume, and schema checks. Include sample SodaCL files.'
      },
      {
        id: 'data-lineage-testing',
        name: 'Data Lineage Testing (OpenLineage / Marquez)',
        description: 'Validate lineage graph correctness, column-level lineage, and impact analysis for regulatory compliance.',
        prompt: 'Build a data lineage testing framework using OpenLineage, Marquez, and pytest. Include: (1) OpenLineage event capture tests — configure Spark/Airflow/dbt with OpenLineage transport, execute a pipeline, assert RunEvent structure (job name, inputs, outputs, run state: START to COMPLETE); (2) Column-level lineage assertion tests — verify column-to-column transformation lineage captured for key transformations; (3) Marquez API query tests — after pipeline run, query the lineage API and assert upstream/downstream graph structure; (4) Lineage completeness tests — every output dataset has at least one input dataset, no orphaned nodes; (5) Data flow regression tests — compare lineage graph before and after code change, assert no unexpected new upstream sources; (6) Impact analysis API tests — given a source dataset, assert downstream consumer list matches expected; (7) Regulatory lineage evidence pack generation as JSON export; (8) Airflow DAG lineage tests with Airflow OpenLineage provider; (9) dbt lineage tests using dbt-openlineage package; (10) CI integration — fail pipeline if lineage coverage drops below threshold. Include Marquez Docker Compose fixture.'
      },
      {
        id: 'etl-performance-benchmarking',
        name: 'ETL Performance Benchmarking Framework',
        description: 'Throughput, latency, parallel load, and incremental load performance regression testing for ETL pipelines.',
        prompt: 'Build an ETL performance benchmarking framework using Python, PySpark, and pytest-benchmark. Include: (1) Throughput benchmarks — measure rows/second for full and incremental load scenarios at 100K, 1M, 10M row scales; (2) Transformation cost profiling — time each major stage (extract, join, aggregate, load) using Spark UI metrics via SparkListener; (3) Memory utilisation tests — assert peak driver and executor memory within configured resource bounds; (4) Parallel load efficiency tests — compare single-partition vs multi-partition load duration, assert throughput improves with parallelism; (5) Incremental vs full-load comparison benchmarks; (6) Database write throughput tests (COPY, INSERT batch, bulk API) with row/sec assertions; (7) pytest-benchmark integration for statistical benchmarking (min, max, mean, stddev, IQR); (8) Regression gate — fail CI if benchmark mean degrades more than 20% from baseline; (9) Baseline storage in JSON and comparison across PRs; (10) Grafana-compatible metric export via Prometheus push; (11) HTML performance report with trend charts per pipeline stage. Include benchmark dataset generators and Makefile.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 3. API & Microservices Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'api-testing',
    name: 'API & Microservices Testing',
    description: 'Comprehensive REST, GraphQL, and gRPC API testing for distributed systems.',
    icon: 'Server',
    category: 'api',
    collection: 'core-engineering',
    domains: [
      'Payment & FinTech APIs', 'Healthcare / FHIR', 'Banking', 'Logistics & Supply Chain',
      'E-Commerce / OMS', 'Social & Media Platforms', 'IoT Backend', 'SaaS Platform',
      'Government Open Data', 'Telecom & CPaaS'
    ],
    subTemplates: [
      {
        id: 'restassured-java',
        name: 'RestAssured (Java)',
        description: 'Robust, expressive API testing for Java ecosystems.',
        prompt: 'Build an enterprise REST API testing framework using Java, RestAssured 5, and TestNG — the industry standard for Java API teams at banks, telecoms, and insurance companies. Include: (1) Request specifications (RequestSpecBuilder) with baseURI, auth headers, and logging filters reused across all tests; (2) Response specifications (ResponseSpecBuilder) asserting status codes, Content-Type, and response time < 2000ms; (3) POJO models with Jackson @JsonProperty for request/response deserialization and strong typing; (4) OAuth2 Bearer token management — fetch token in @BeforeClass, inject via RequestSpecification, handle token expiry with refresh; (5) JSON Schema validation with json-schema-validator library for contract assertions; (6) Chained API test scenarios: POST /users → extract userId → GET /users/{id} → assert data matches; (7) Data-driven tests using TestNG @DataProvider loading test scenarios from JSON/CSV files; (8) Allure reporting with @Step annotations and request/response body attachments in failure reports; (9) Environment-specific config (dev/staging/prod) via properties files and System.getProperty(); (10) Negative test suites: 400 validation errors, 401 unauthorized, 403 forbidden, 404 not found, 409 conflict, 429 rate limited, 503 circuit breaker; (11) Pact consumer contract generation from RestAssured tests; (12) GitHub Actions pipeline with parallel TestNG suite execution. Generate 25+ tests for CRUD operations, authentication flows, pagination, filtering, and error handling.'
      },
      {
        id: 'pytest-requests',
        name: 'pytest + Requests (Python)',
        description: 'Powerful and readable API testing using Python.',
        prompt: 'Build a Python REST API testing framework using pytest and httpx/requests — standard for Python API teams at data-intensive companies and ML platforms. Include: (1) conftest.py with session-scoped fixtures for base_url, auth_headers, and test_client; (2) Pydantic models for request/response validation — assert every response field type, required fields, and value constraints; (3) pytest.mark.parametrize for testing multiple scenarios per endpoint (valid inputs, boundary values, invalid inputs); (4) httpx AsyncClient for testing async FastAPI/aiohttp backends with anyio test fixtures; (5) jsonschema library for JSON Schema draft-7 contract validation; (6) responses or respx library for mocking external HTTP calls in unit tests; (7) API response time assertions using time.perf_counter() with custom pytest-check soft assertions; (8) Authentication test suite: JWT creation/expiry/tamper, API key valid/invalid/missing, OAuth2 PKCE flow; (9) allure-pytest with @allure.title, @allure.description, @allure.step, and request/response body attachments; (10) pytest-httpserver for testing webhook delivery and callback endpoints; (11) Environment configuration via pydantic BaseSettings loading from .env files; (12) GitHub Actions with pytest --tb=short -v --alluredir=allure-results and report deploy to GitHub Pages. Generate 25+ tests covering CRUD, auth, pagination, search/filter, bulk operations, and error scenarios.'
      },
      {
        id: 'supertest-jest',
        name: 'Supertest + Jest (Node.js)',
        description: 'Fast in-process API testing for Node.js backends.',
        prompt: 'Build a Node.js API testing framework using Supertest and Jest — standard for Express/NestJS/Fastify backend teams. Include: (1) Jest globalSetup starting the Express/NestJS app server, globalTeardown closing it, and beforeEach database transaction rollback for test isolation; (2) Supertest request() wrapping the app instance (no running server needed) for in-process testing; (3) TypeScript interfaces for all request/response payloads with strict assertion typing; (4) JWT authentication helper generating signed test tokens for different roles (admin, user, readonly); (5) nock interceptors for mocking downstream HTTP services (payment gateway, email service, S3); (6) Testcontainers Postgres/Redis for real database integration tests — full CRUD validation; (7) JSON schema validation with ajv for API contract enforcement; (8) jest-extended matchers for readable assertions (toBeArray(), toContainAllKeys(), toBeISODateString()); (9) Response time assertions using jest-performance-matchers; (10) API security tests: missing token returns 401, wrong role returns 403, IDOR attack (user A accesses user B’s data) returns 403; (11) Pagination tests: page=1&limit=10 returns correct subset, total count header present; (12) GitHub Actions with jest --coverage and codecov upload. Generate 25+ tests for REST CRUD endpoints, auth middleware, role-based access, webhook handling, and error boundaries.'
      },
      {
        id: 'karate-dsl',
        name: 'Karate DSL',
        description: 'BDD-style API testing with built-in mocking and performance testing.',
        prompt: 'Build a Karate DSL API testing framework — widely adopted in Java enterprise teams for its readable syntax and zero-boilerplate approach. Include: (1) Karate feature files with Given/When/Then structure for all CRUD operations and business flows; (2) karate-config.js with environment-based URL switching (dev/staging/prod) and auth token generation; (3) Dynamic data-driven tests using Karate Tables (Examples:) for boundary value and equivalence class testing; (4) JSON schema validation inline using match each response payload; (5) Karate mocks server — simulate downstream APIs with stateful mock feature files for consumer contract simulation; (6) OAuth2 flow using callonce karate.callSingle() for token fetch and reuse across the feature file lifetime; (7) GraphQL query testing using Karate’s text: block for multi-line query bodies; (8) Gatling performance integration: convert Karate tests to Gatling scenarios with gatling:test Maven goal, assert p95 < 1000ms throghout goals; (9) karate-junit5 parallel execution with 5 threads for 10x CI speed improvement; (10) karate-report HTML dashboard with pie charts per feature; (11) Hooks using Background and callonce for shared setup across scenarios; (12) GitHub Actions with mvn test -Dkarate.env=staging. Generate full feature files for a payment API, user management API, and search API with 20+ scenarios each.'
      },
      {
        id: 'graphql-testing',
        name: 'GraphQL Testing (Jest + Apollo)',
        description: 'Specialized testing for GraphQL APIs including subscriptions.',
        prompt: 'Build a GraphQL API testing framework using Jest and Apollo Client — used by teams at GitHub, Twitter, and Shopify for testing graph-based APIs. Include: (1) ApolloClient test configuration with InMemoryCache and test-specific URI pointing to a test server; (2) GraphQL query tests asserting specific fields, nested objects, and connection pagination (edges/nodes/pageInfo); (3) Mutation tests: CREATE/UPDATE/DELETE with optimistic response and cache update assertion; (4) Subscription tests using Observable from ApolloClient with subscription to real-time WebSocket events; (5) Apollo MockedProvider for unit-level component testing with controlled mock responses; (6) GraphQL schema introspection tests ensuring schema matches expected snapshot; (7) Authorization tests: queries returning null/errors for unauthorised fields, directives (@auth) enforced; (8) N+1 query detection: assert dataloader batching produces a single DB call for list queries using query spy; (9) Error handling tests: assert GraphQL error array populated correctly, no stack traces leaked to client; (10) Persisted query tests: assert server accepts and serves APQ hashes; (11) Rate limiting tests for GraphQL complexity analysis (overly nested queries rejected); (12) GitHub Actions with Jest --testPathPattern=graphql. Generate 20+ tests for a social platform or e-commerce GraphQL API covering queries, mutations, subscriptions, and error scenarios.'
      },
      {
        id: 'grpc-testing',
        name: 'gRPC Service Testing',
        description: 'Testing framework for Protocol Buffer based gRPC microservices.',
        prompt: 'Build a gRPC service testing framework — standard for microservices teams at Square, Netflix, Google, and Uber using Protocol Buffers. Include: (1) In-process gRPC server using TestServer (Go) or GrpcInProcessTestServer (Java) or grpc.testing (Python) — no network overhead; (2) Generated proto stub clients (protoc-generated) making type-safe RPC calls in tests; (3) Unary RPC tests: valid request returns expected response, invalid input returns Status.INVALID_ARGUMENT with expected error message; (4) Server-streaming RPC tests: collect all messages from stream into list, assert count, ordering, and message content; (5) Client-streaming RPC tests: send N messages, assert server-side aggregation correct; (6) Bidirectional streaming tests: interleave client sends and server receives, validate ordering; (7) Metadata/header assertion tests: auth token extracted from metadata, custom headers propagated; (8) gRPC Status code tests: each RPC correctly returns UNAUTHENTICATED, NOT_FOUND, ALREADY_EXISTS, RESOURCE_EXHAUSTED where applicable; (9) Interceptor tests: logging interceptor, auth interceptor, retry interceptor unit tests with mock handler; (10) Performance benchmarks with ghz: 1000 requests, assert p99 latency < 100ms for critical RPCs; (11) Testcontainers setup for integration tests with real database backend; (12) GitHub Actions building proto, generating stubs, and running test suite. Generate test suite for a payment or inventory gRPC service with all 4 RPC types covered.'
      },
      {
        id: 'postman-newman',
        name: 'Postman / Newman Collection Testing',
        description: 'API testing using Postman collections with Newman CI runner.',
        prompt: 'Build an API testing framework using Postman collections and Newman CLI. Include environment-based variable management (dev/staging/prod), pre-request scripts for auth token handling, test scripts with pm.expect assertions for status codes, response schema validation, and data-driven testing from CSV/JSON files. Add Newman HTML reporter, parallel collection runs, Postman Monitor scheduling, and GitHub Actions CI integration with run summary comments on PRs.'
      },
      {
        id: 'wiremock-msw',
        name: 'WireMock / Mock Service Worker (MSW)',
        description: 'Stateful API mocking for JVM/Docker backends and frontend Jest/Playwright tests.',
        prompt: 'Build an API mocking framework using WireMock (Docker/JVM) for backend integration tests and Mock Service Worker (MSW 2.x) for frontend Jest and Playwright tests. Include stateful scenario stubs, request journal assertions, fault injection simulations (delays, connection resets), templated dynamic responses, MSW service worker setup for React Testing Library tests, and a shared mock definition library ensuring backend and frontend mocks stay in sync.'
      },
      {
        id: 'dredd-openapi',
        name: 'Dredd (OpenAPI Contract Runner)',
        description: 'Spec-first API contract testing executing tests from OpenAPI definitions.',
        prompt: 'Create a Dredd-based API contract testing framework. Include OpenAPI 3.x spec parsing with automatic test case generation for every operation, hooks (before/after) in JavaScript/Python for auth setup and teardown, transaction modification for edge-case inputs, CI pipeline executing Dredd against a live test server, response schema deviation reporting, and a Make/npm script for local dev spec-drift detection.'
      },
      {
        id: 'bruno-api-testing',
        name: 'Bruno API Collection Testing',
        description: 'Git-friendly, IDE-native API collection testing with Bruno for teams ditching Postman.',
        prompt: 'Build an API testing framework using Bruno — the open-source, git-native Postman alternative. Include: (1) Bruno collection folder structure (collections/.bru files) organized by domain/service; (2) Environment files (environments/dev.bru, staging.bru, prod.bru) with variable substitution; (3) Pre-request scripts for dynamic auth token injection (OAuth2, API keys, HMAC signatures); (4) Post-response test scripts using Bruno\'s built-in assertion library (expect, test blocks); (5) Collection-level and folder-level auth configuration inheritance; (6) Sequence tests (chained requests where response data feeds next request); (7) bru CLI runner for CI execution with JUnit XML output; (8) GitHub Actions pipeline running bru run --env staging --reporter junit; (9) Secret variable management via .env files (gitignored); (10) OpenAPI spec import workflow and keeping collection in sync with spec; (11) Team collaboration patterns — PRs for collection changes, review workflow. Include example collection for CRUD API and CI pipeline YAML.'
      },
      {
        id: 'api-breaking-change-detection',
        name: 'API Breaking Change Detection (Optic / openapi-diff)',
        description: 'Automated detection of breaking API changes in CI using OpenAPI diff tools.',
        prompt: 'Build an API breaking change detection framework using Optic, openapi-diff, and oasdiff. Include: (1) Optic CI integration — capture API traffic in tests, generate OpenAPI spec from observed traffic, compare against committed spec; (2) oasdiff breaking change detection between two OpenAPI specs (added required params, removed endpoints, changed response schemas, modified security schemes); (3) Non-breaking change allowlist (adding optional fields, new endpoints, deprecation notices); (4) Breaking change severity classification (ERROR for breaking, WARN for deprecated); (5) GitHub Actions PR comment with breaking change diff summary; (6) Webhook notification to Slack for breaking changes on main branch; (7) Consumer-driven contract verification to prevent breaking consumer integrations; (8) API version bump enforcement when breaking changes detected; (9) Changelog generation from spec diffs; (10) Optic cloud dashboard integration for API history tracking. Include .optic config and GitHub Actions workflow.'
      },
      {
        id: 'kong-apigee-gateway-testing',
        name: 'Kong / Apigee API Gateway Testing',
        description: 'Policy validation, rate limiting, auth plugin, and proxy transformation tests for API gateways.',
        prompt: 'Build an API gateway testing framework covering Kong and Apigee. Include: (1) Kong plugin unit tests using kong.tools.simulate and pongo (Plugin Test Framework) — test rate-limiting plugin, JWT auth plugin, CORS plugin, request transformation plugin; (2) Kong Admin API integration tests — create services, routes, and consumers via API, assert configuration round-trips; (3) Kong rate limiting policy tests — send N+1 requests, assert 429 response with Retry-After header; (4) Kong JWT authentication tests — valid token passes, expired token returns 401, missing token returns 401; (5) Kong request/response transformer plugin tests — header injection, query param stripping, body modification; (6) Apigee proxy policy tests using Apigee Emulator or Apickli BDD framework; (7) Apigee quota and spike arrest policy enforcement tests; (8) Gateway routing tests — path prefix routing, host-based routing, weighted upstreams; (9) Health check and circuit breaker plugin tests; (10) Load balancing algorithm tests (round-robin, least-connections); (11) GitHub Actions pipeline with Kong in Docker. Include Docker Compose and pongo test setup.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 4. Mobile App Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'mobile-testing',
    name: 'Mobile App Testing',
    description: 'Native and cross-platform mobile testing for iOS, Android, and hybrid apps.',
    icon: 'Smartphone',
    category: 'mobile',
    collection: 'product-experience',
    domains: [
      'Banking & FinTech', 'Healthcare & Wellness', 'E-Commerce & Retail',
      'Social Media & Communication', 'Gaming & Entertainment', 'Travel & Navigation',
      'Food Delivery & Logistics', 'Government & Civic Apps', 'Education & EdTech',
      'Fitness & Wearables'
    ],
    subTemplates: [
      {
        id: 'appium-webdriverio',
        name: 'Appium + WebdriverIO',
        description: 'Cross-platform automation for iOS and Android using JavaScript.',
        prompt: 'Build a cross-platform mobile testing framework using Appium 2.x and WebdriverIO as used by enterprise mobile teams at telebanking, insurance, and healthcare companies. Include: (1) wdio.conf.ts with dual capability sets: Android UIAutomator2 (emulator and BrowserStack real device) and iOS XCUITest (Simulator and BrowserStack real device); (2) Page Object Models with platform-agnostic selectors — platform === iOS ? by.accessibility : by.uiautomator; (3) Gesture automation using W3C Actions API: swipeLeft, swipeRight, pinchZoom, doubleTap, longPress helper methods; (4) Deep link testing: driver.url(deepLinkUrl) to launch app at specific screen, assert navigation state; (5) Network condition simulation using ADB commands (throttleNetwork, enableAirPlaneMode) and iOS Network Link Conditioner; (6) App installation/launch state management: reinstall for clean state in reset-heavy tests; (7) Biometric authentication mock: driver.execute("mobile: enrollBiometric") for fingerprint success/failure simulation; (8) Allure reporting with device screenshots, device info, and OS version in report metadata; (9) BrowserStack App Automate: app upload via REST API, real device matrix config in wdio.bs.conf.ts; (10) Visual regression with @wdio/visual-service for pixel-diff on critical screens; (11) App performance metrics with driver.execute("mobile: getPerformanceData") for CPU/memory assertions; (12) GitHub Actions pipeline uploading APK/IPA to BrowserStack and parsing results. Generate 20+ tests for login, onboarding, transaction flows, notifications, and offline mode.'
      },
      {
        id: 'detox-react-native',
        name: 'Detox (React Native)',
        description: 'Gray-box E2E testing tightly integrated with RN bundler.',
        prompt: "Build a Detox E2E testing framework for a React Native application. Include device/emulator configuration, navigation flow tests, network mocking with Detox's custom mock server, push notification tests, deep link handling, snapshot testing, and CI integration with Bitrise/GitHub Actions."
      },
      {
        id: 'espresso-android',
        name: 'Espresso (Android)',
        description: "Google's native UI testing framework for Android apps.",
        prompt: 'Build an Espresso testing framework for an Android app using Kotlin — Google\'s official Android UI testing toolkit used by apps across the Google Play Store for pre-launch device testing. Include: (1) EspressoTest class organisation: unit tests with Robolectric for ViewModels/UseCases, integration tests with Espresso for fragments/activities, end-to-end tests with UIAutomator for cross-app flows; (2) Custom IdlingResource implementations for Retrofit network calls, Room database operations, and coroutines (OkHttp3IdlingResource, CountingIdlingResource); (3) Hilt test components using @HiltAndroidTest, @HiltAndroidRule, and @BindValue for injecting test fakes; (4) MockWebServer for intercepting Retrofit calls — return controlled JSON responses for deterministic tests; (5) Robolectric unit tests for ViewModel state using turbine + coroutine test dispatcher; (6) UI interactions: onView(withId()), perform(click(), typeText(), scrollTo()), check(matches(isDisplayed())); (7) RecyclerViewActions for list item interaction and assertion; (8) Espresso-Intents for verifying outgoing Intents (camera, maps, share); (9) ScreenshotRule capturing state on test failure; (10) Firebase Test Lab integration via gcloud CLI — run Espresso suite on 5 real Android devices; (11) Jacoco coverage report generation with 80% line coverage threshold; (12) GitHub Actions with Android emulator action (reactivecircus/android-emulator-runner). Generate 20+ tests for app startup, login, list/detail navigation, form submission, and settings flows.'
      },
      {
        id: 'xctest-ios',
        name: 'XCTest + XCUITest (iOS)',
        description: "Apple's native testing suite for iOS/macOS apps.",
        prompt: 'Build an XCTest and XCUITest framework for an iOS/macOS app using Swift — Apple\'s official testing framework, mandatory for App Store apps and used by all major iOS teams. Include: (1) Test target organisation: UnitTests (XCTestCase classes per service/viewmodel), UITests (XCUITest journey tests), PerformanceTests (XCTMetric); (2) XCUIApplication setup with launchArguments for test mode, feature flags, and mock server URL; (3) Page Object Model: XCUIElementQuery-based helper classes per screen (OnboardingScreen, HomeScreen, CheckoutScreen) with typed element properties; (4) Accessibility Identifier strategy: set .accessibilityIdentifier in production code using #if DEBUG guard, document in XCUIAccessibilityIds enum; (5) XCUIElement interactions: .tap(), .doubleTap(), .press(forDuration:), .swipeLeft(), .typeText(), .clearAndEnterText(); (6) swift-snapshot-testing by PointFree — generate .png reference snapshots on master, assert no diff on PRs; (7) XCTMetric performance tests: measure { } block for CPU, memory, storage, clock metrics with baseline comparison; (8) XCTSkip for conditional platform-version skipping; (9) Fastlane scan integration with xcresult parsing and HTML reporting; (10) Xcode Cloud workflow running tests on iPhone 15 Simulator and iPad Pro; (11) Firebase Crashlytics integration tests in test-mode; (12) Network call interception using URLProtocol stub for deterministic API response tests. Generate 20+ tests for onboarding, authentication, search, cart, and payment flows.'
      },
      {
        id: 'flutter-integration',
        name: 'Flutter Integration Testing',
        description: 'Cross-platform testing for Flutter apps across iOS and Android.',
        prompt: 'Build a Flutter testing framework covering all three testing layers — unit, widget, and integration — as recommended in Flutter\'s official testing guide and used by companies like BMW, Alibaba, and Google Pay. Include: (1) Unit tests for business logic: pure Dart test files, mock dependencies with mockito and build_runner generated mocks; (2) Widget tests with flutter_test: pumpWidget() with WidgetTester, finder patterns (find.byType(), find.byKey(), find.text()), tap/enterText/drag interactions, await tester.pumpAndSettle(); (3) Golden (snapshot) tests with flutter_test golden toolchain — matchesGoldenFile() for pixel-perfect widget regression; (4) Integration tests with integration_test package — full app on real device/emulator, FlutterDriver deprecated, use integrationDriver(); (5) Riverpod/Bloc/Provider test utilities — ProviderContainer for Riverpod state testing, blocTest() from bloc_test package; (6) Network mock using http_mock_adapter or MockClient from http package — no real network calls in tests; (7) Firebase emulator suite integration for Firestore and Auth tests; (8) Device-specific tests using defaultTargetPlatform conditional assertions; (9) flutter_driver for performance timeline capture and frame render time assertions; (10) Test coverage with flutter test --coverage generating lcov.info for codecov.io; (11) GitHub Actions matrix: ubuntu (Android), macos (iOS); (12) Patrol package for more powerful native UI interaction (permission dialogs, notifications, deep links). Generate 20+ tests for onboarding, form validation, navigation, API integration, and state management flows.'
      },
      {
        id: 'maestro-mobile',
        name: 'Maestro Mobile UI Testing',
        description: 'YAML-driven mobile UI testing for iOS and Android without boilerplate.',
        prompt: 'Build a Maestro mobile UI testing framework — the fastest-growing YAML-driven mobile testing tool adopted by startups and scale-ups running lean QA teams. Include: (1) Flow files organised by feature: flows/auth/login.yaml, flows/checkout/complete_purchase.yaml, flows/profile/edit_profile.yaml; (2) YAML syntax using tapOn, inputText, assertVisible, assertNotVisible, scrollUntilVisible, swipeLeft, back, hideKeyboard; (3) runFlow command for composable sub-flows (flows/_helpers/login_as_user.yaml included in test flows); (4) Environment variable injection using ${MAESTRO_APP_ENV} in flow files for dev/staging switches; (5) launchApp with clearState: true for deterministic test starts; (6) Network mocking: use Charles Proxy or mitmproxy rewrite rules to return fixture responses for external API calls; (7) Conditional flows using runScript for JavaScript-based assertions and complex conditionals; (8) Parallel execution with maestro test --parallel flows/ across multiple connected devices; (9) Maestro Cloud CI: maestro cloud push --apiKey $MAESTRO_KEY flows/ for real device testing on demand; (10) Tagging and selection: include metadata comments in YAML for smoke vs full suite filtering; (11) Screenshot comparison with Maestro’s built-in takeScreenshot command and reference image; (12) GitHub Actions running Maestro against both Android emulator and iOS Simulator. Generate 20+ flow files covering onboarding, authentication, key user journeys, and edge cases.'
      },
      {
        id: 'browserstack-app-automate',
        name: 'BrowserStack App Automate',
        description: 'Real device cloud testing for Appium, Espresso, and XCUITest.',
        prompt: 'Create a BrowserStack App Automate testing framework. Include Appium tests for cross-platform user flows with real device capabilities, Espresso test suite upload for Android fast-lane execution, XCUITest bundle integration for iOS, parallel device session management, app upload and versioning via REST API, Percy visual diff for mobile screenshots, test observability integration for flaky test detection, and GitHub Actions upload-and-run pipeline.'
      },
      {
        id: 'appium-java-testng',
        name: 'Appium Java — TestNG + Device Farm',
        description: 'Enterprise-grade Appium Java framework with TestNG, Page Object Model, and AWS Device Farm.',
        prompt: 'Build an enterprise Appium Java testing framework using TestNG and the Page Object Model pattern. Include: (1) AppiumDriver factory with platform detection (AndroidDriver/IOSDriver) and capability management via JSON config files; (2) Page Object Model with MobileBasePage containing common Appium interactions (tap, swipe, scroll, long press, drag-and-drop); (3) TestNG XML suite configuration for device parallelism; (4) Appium 2.x plugin integration (gestures, images comparison); (5) Touch gestures — swipe left/right, scroll to element, pinch/zoom using W3C Actions API; (6) Deep link testing for Android and iOS universal links; (7) Push notification testing (APN and FCM mock); (8) Camera and QR code scanner mocking; (9) Allure reporting with device screenshots on failure; (10) AWS Device Farm integration — upload APK/IPA, run TestNG suite on real devices, retrieve results; (11) Maven configuration with Failsafe plugin for integration tests; (12) GitHub Actions pipeline with emulator startup. Include pom.xml and TestNG XML.'
      },
      {
        id: 'react-native-testing',
        name: 'React Native Testing Library + Maestro E2E',
        description: 'Component unit tests with RNTL and full E2E user flow tests with Maestro YAML.',
        prompt: 'Build a React Native testing framework using React Native Testing Library (RNTL) for component tests and Maestro for E2E tests. Include: (1) RNTL component unit tests — render with renderWithProviders wrapper, fireEvent for user interaction simulation, screen queries (getByRole, getByText, getByTestId); (2) Custom render wrapper injecting Redux store, React Navigation, and theme providers; (3) Navigation flow tests with @react-navigation/testing-library; (4) Mock implementations for native modules (camera, biometrics, push notifications, location); (5) Snapshot tests with react-test-renderer for UI regression; (6) Maestro E2E YAML flows — tapOn, inputText, assertVisible, scrollUntilVisible, runScript for conditional assertions; (7) Maestro test suites organized by feature with shared setup flows; (8) Maestro Cloud integration for CI execution on real devices; (9) Jest configuration with jest-expo preset and module name mapper; (10) Code coverage with jest --coverage and threshold gates; (11) GitHub Actions pipeline running Jest unit tests + Maestro E2E on Android emulator. Include jest.config.js and Maestro flow examples.'
      },
      {
        id: 'ionic-cordova-hybrid-testing',
        name: 'Ionic / Capacitor Hybrid App Testing',
        description: 'End-to-end and component tests for Ionic Angular/React apps with Capacitor native bridge.',
        prompt: 'Build a testing framework for Ionic + Capacitor hybrid mobile applications. Include: (1) Cypress component tests for Ionic Angular/React components — render ion-component elements, fire Ionic-specific events, assert component state; (2) Angular TestBed unit tests for Ionic Angular services and pages with CapacitorMock utilities; (3) Ionic native plugin mocking — Camera, Filesystem, Preferences, Geolocation, Push Notifications via @capacitor/mock or jest.mock(); (4) Playwright E2E tests running the Ionic app in the browser with ion-app style assertions; (5) Appium tests running the Capacitor-packaged app on Android and iOS; (6) Web Component (Stencil.js) unit tests for custom ion-component overrides; (7) Capacitor bridge mock for unit tests communicating with native plugins; (8) Offline mode tests — disable network and verify local storage / sync behaviour; (9) Deep link and push notification integration tests; (10) Ionic lifecycle hook tests (ionViewWillEnter, ionViewDidLeave with TestBed); (11) GitHub Actions pipeline with ionic build and Capacitor sync before Appium tests. Include jest.config.ts and Cypress configuration.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 5. AI / ML & LLM Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'ai-testing',
    name: 'AI / ML & LLM Testing',
    description: 'Evaluate, validate, and red-team AI models, LLM pipelines, and RAG systems.',
    icon: 'Bot',
    category: 'ai',
    collection: 'data-ai',
    domains: [
      'Customer Service AI / Chatbots', 'Healthcare AI & Clinical Decision Support',
      'FinTech & Risk AI', 'Legal & RegTech AI', 'HR & Recruitment AI',
      'Content Generation & Media AI', 'Education & Adaptive Learning AI',
      'Supply Chain & Demand Forecast AI', 'Autonomous Vehicles & Robotics',
      'Cybersecurity AI'
    ],
    subTemplates: [
      {
        id: 'llm-eval-promptfoo',
        name: 'LLM Evaluation (Promptfoo)',
        description: 'Test prompt quality, regressions, and multi-model comparisons.',
        prompt: 'Build an LLM evaluation framework using Promptfoo. Include test cases for prompt injection, hallucination detection, semantic similarity checks, toxicity scoring, and multi-model comparison (OpenAI, Gemini, Claude). Add CI/CD integration, regression baselines, and HTML dashboard reporting.'
      },
      {
        id: 'deepeval-ragas',
        name: 'RAG Pipeline Validation (DeepEval / Ragas)',
        description: 'Test Retrieval-Augmented Generation systems on correctness and faithfulness.',
        prompt: 'Create a RAG pipeline testing framework using DeepEval and Ragas. Include metrics for context precision, context recall, answer relevance, faithfulness, and answer correctness. Add test dataset generation, threshold-based CI gates, per-chunk retrieval quality analysis, and Confluence/JIRA reporting integration.'
      },
      {
        id: 'mlflow-model-testing',
        name: 'ML Model Validation (MLflow)',
        description: 'Validate ML model accuracy, drift, and fairness across versions.',
        prompt: 'Build an ML model validation framework using MLflow and pytest. Include accuracy/precision/recall regression tests, data drift detection using Evidently AI, model fairness testing across demographic slices, explainability checks with SHAP, shadow mode comparison tests, and automated retraining gates.'
      },
      {
        id: 'ai-red-teaming',
        name: 'AI Security & Red Teaming',
        description: 'Automated adversarial testing for AI applications.',
        prompt: 'Build an automated red-teaming framework for an AI system. Include test suites for jailbreaks, PII leakage, toxicity generation, adversarial prompt attacks, model inversion resistance, and bias probing. Use PyRIT and Garak for automated generation of adversarial inputs with severity-ranked HTML reports.'
      },
      {
        id: 'computer-vision-testing',
        name: 'Computer Vision Model Testing',
        description: 'Validate object detection, classification, and segmentation models.',
        prompt: 'Create a computer vision model testing framework using pytest and supervision. Include mAP/precision/recall metrics, confusion matrix analysis, edge-case dataset curation (low light, occlusion, adversarial patches), data augmentation coverage tests, ONNX model accuracy parity checks, and a Streamlit dashboard for visual diff review.'
      },
      {
        id: 'langsmith-tracing',
        name: 'LangSmith Tracing & LLM Evaluation',
        description: 'LangChain observability, evaluation datasets, and assertion-based LLM evals.',
        prompt: 'Build an LLM evaluation and observability framework using LangSmith. Include run tracing for LangChain pipelines, dataset upload and versioning for golden QA pairs, evaluator functions (correctness, relevance, hallucination score), CI-driven eval runs with pass/fail thresholds, prompt playground A/B comparison, regression monitoring across model versions, and Slack alert integration for eval score drops.'
      },
      {
        id: 'responsible-ai-testing',
        name: 'Responsible AI — Bias & Fairness Testing',
        description: 'Fairness, bias, and safety evaluation for machine learning models.',
        prompt: 'Create a responsible AI testing framework using Fairlearn, AI Fairness 360, and Giskard. Include demographic parity and equalized odds metric computation across protected attributes, disparate impact threshold tests, counterfactual fairness checks, slice-based performance disparity analysis, red-teaming prompts for LLM safety failures, robustness tests under distribution shift, and an HTML fairness audit report with recommended mitigations.'
      },
      {
        id: 'llm-cost-regression-testing',
        name: 'LLM Cost & Token Efficiency Testing',
        description: 'Track and gate token consumption, latency, and cost regressions for LLM-powered features.',
        prompt: 'Build an LLM cost and token efficiency testing framework using Python, LangSmith, and Braintrust. Include: (1) Token count assertion tests — for each prompt template, assert total_tokens < baseline threshold (track input tokens, output tokens, cached tokens separately); (2) Cost regression gate — compute cost (token_count * model_price_per_token), fail CI if cost increases more than 10% from baseline; (3) Latency SLO tests — assert p50 and p95 latency within defined SLOs per model and prompt type; (4) Prompt caching effectiveness tests — assert cache_hit_tokens / total_tokens > threshold for repeated calls; (5) Response quality regression tests — evaluate responses with an LLM judge scoring faithfulness, relevance, and conciseness; (6) Batch inference cost optimization tests — compare streaming vs batch costs; (7) Model comparison tests — same prompt against GPT-4o-mini vs GPT-4o, assert quality delta acceptable for cost savings; (8) LangSmith trace capture and dataset creation for regression testing; (9) GitHub Actions scheduled cost trend report with alert thresholds; (10) Budget enforcement: fail pipeline if projected monthly cost exceeds configured limit. Include cost tracking helpers and baseline storage.'
      },
      {
        id: 'model-latency-slo-testing',
        name: 'ML Model Latency SLO & A/B Testing',
        description: 'Latency SLO enforcement, shadow deployment, and A/B testing infrastructure for ML models.',
        prompt: 'Build an ML model latency SLO and A/B testing framework using Python, Locust, and MLflow. Include: (1) Inference latency SLO tests — assert p50 < 100ms, p95 < 500ms, p99 < 1s for each model endpoint using pytest-benchmark; (2) Load test with Locust — ramp to 100 concurrent inference requests, assert SLO maintained under load; (3) Shadow deployment tests — route 5% of production traffic to new model, compare outputs (latency, accuracy, token usage) without affecting users; (4) A/B test harness — split requests between model A and model B, collect metrics, run statistical significance test (Mann-Whitney U test); (5) Model warm-up tests — first request (cold start) latency vs sustained request latency comparison; (6) Batch size optimization tests — assert optimal batch size for throughput vs latency tradeoff; (7) Model caching layer tests — assert cache hit reduces latency by expected %; (8) GPU utilisation efficiency tests for self-hosted models; (9) MLflow experiment tracking integration for latency trends; (10) Automated rollback trigger test — if model B p99 > threshold, assert traffic shifted back to model A. Include Locust task definitions and MLflow logging helpers.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 6. Performance & Load Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'performance-testing',
    name: 'Performance & Load Testing',
    description: 'Validate system behavior, throughput, and resilience under various load conditions.',
    icon: 'Zap',
    category: 'performance',
    collection: 'platform-reliability',
    domains: [
      'E-Commerce & Flash Sales', 'Banking & Trading Platforms', 'Video Streaming & CDN',
      'Online Gaming', 'Healthcare Portals', 'SaaS & Multi-Tenant Platforms',
      'Government High-Traffic Portals', 'Telecom & CPaaS', 'IoT & Edge Computing',
      'Social Media & Viral Traffic'
    ],
    subTemplates: [
      {
        id: 'k6-js',
        name: 'k6 (JavaScript)',
        description: 'Developer-centric load testing with real-time metrics and CI/CD integration.',
        prompt: 'Build a production-grade Grafana k6 performance testing framework as used by Grafana, Adobe, and many SaaS companies for continuous performance testing in CI. Include: (1) Four scenario scripts: loadTest.js (steady 100 VUs), stressTest.js (ramp to 500 VUs), spikeTest.js (instant spike from 10 to 1000 VUs), soakTest.js (sustained 200 VUs for 1 hour); (2) k6 Thresholds as executable SLOs: http_req_duration: ["p(95)<1000", "p(99)<2000"], http_req_failed: ["rate<0.01"]; (3) Custom metrics: new Trend("checkout_duration"), new Counter("payment_errors") for business-level KPIs; (4) Scenarios using executor: "ramping-arrival-rate" for realistic request rate control independent of VU count; (5) k6 Groups and Checks: group("Checkout Flow", ...) with check() for response body and status; (6) CSV data files loaded with SharedArray for parameterised user credentials (no memory duplication per VU); (7) Environment variable injection: const BASE_URL = __ENV.BASE_URL || "https://staging.example.com"; (8) Grafana Cloud k6 integration with K6_CLOUD_TOKEN for real-time dashboard; (9) InfluxDB + Grafana local dashboard: k6 run --out influxdb=http://localhost:8086/k6; (10) k6 extensions: xk6-browser for realistic browser tests, xk6-disruptor for chaos injection during load; (11) Trend comparison: save baseline JSON, compare with k6 compare command, fail CI on >20% p95 regression; (12) GitHub Actions pipeline running load test against staging with Slack alert on threshold breach. Generate complete load testing suite for an e-commerce or SaaS API.'
      },
      {
        id: 'jmeter',
        name: 'Apache JMeter',
        description: 'Enterprise-grade load testing with GUI and headless execution.',
        prompt: 'Build an Apache JMeter performance testing framework — the dominant enterprise load testing tool used by banks, telecoms, and government agencies for non-negotiable compliance load reports. Include: (1) JMeter Test Plan (JMX) with Thread Groups for: ramp-up load (0 to 1000 users over 10 min), steady state (1000 users for 30 min), peak burst (2000 users for 5 min); (2) HTTP Samplers for all critical API endpoints with parameterisation via CSV Data Set Config; (3) Regular Expression Extractor and JSON Path Extractor for correlation (extract session token from login response, inject into subsequent requests); (4) Assertions: Response Assertion (status 200), Size Assertion (gzip response < 50KB), Duration Assertion (< 2000ms); (5) Timers: Constant Throughput Timer for precise RPS control, Gaussian Random Timer for realistic think time simulation; (6) Backend Listener publishing results to InfluxDB in real-time with Grafana JMeter dashboard (dashboard ID 5496); (7) JMeter distributed load test setup: 3 JMeter server nodes, 1 controller, Maven jmeter-maven-plugin for headless execution; (8) Docker-based JMeter cluster using blazemeter/jmeter Docker image for CI; (9) JMeter HTML report generation: jmeter -g results.jtl -o html-report/ with response time percentiles, throughput, and error rate; (10) Assertions to fail CI: ErrorRate > 1% or p95 > 2000ms triggers build failure; (11) Test data factory: generate realistic user accounts, products, and order data as CSV beforehand; (12) GitHub Actions running distributed JMeter tests with HTML report artifact upload. Generate complete JMX for a banking or e-commerce system.'
      },
      {
        id: 'gatling-scala',
        name: 'Gatling (Scala / Java)',
        description: 'Code-first performance testing with detailed HTML reports.',
        prompt: 'Build a Gatling performance testing framework in Scala DSL — the preferred load testing tool for Java/Scala teams at financial services companies due to its deterministic, actor-based execution model and detailed HTML reports. Include: (1) Simulation classes extending Simulation with simulation name, description, and protocol config; (2) HTTP protocol configuration: baseUrl, headers, connection reuse, DNS caching, warmup request; (3) Realistic user scenarios with exec() chains: login, browse, add to cart, checkout with think time .pause(2, 5); (4) Feeder files (CSV and JSON feeders) for data injection with csv("users.csv").circular; (5) Session attributes: session("authToken") extracted from login response, injected into subsequent request headers; (6) Injection profiles: rampUsers(500).during(300), constantUsersPerSec(100).during(600), heavisideUsers(1000).during(120) for phased load; (7) Assertions: global().responseTime().percentile(95).lt(1000), global().failedRequests().percent().lt(1); (8) Gatling Enterprise integration: buildGatlingClient, upload simulation, run and poll results; (9) Jenkins pipeline: mvn gatling:test -Dgatling.simulationClass=CheckoutSimulation pulling results into Jenkins Gatling plugin graph; (10) Custom stats: groups for business transaction breakdown (Login Group, Browse Group, Checkout Group); (11) Gatling Recorder session playback as starting simulation template; (12) GitHub Actions with Maven and Gatling HTML report artifact. Generate complete Simulation for an e-commerce or trading platform with 20+ scenario steps.'
      },
      {
        id: 'locust-python',
        name: 'Locust (Python)',
        description: 'Highly scalable distributed load testing with Python scripting.',
        prompt: 'Build a Locust distributed load testing framework — Python-based and highly scalable, used by Spotify and various data-intensive platforms for flexible load testing with custom task weights. Include: (1) Locust User classes with @task decorators and computed weights (checkout 1x, browse 10x, login 3x) reflecting production traffic patterns; (2) Sequential task groups using TaskSet for stateful user journeys (login → browse → cart → checkout); (3) Custom wait_time using between(1, 5) and constant_pacing(10) to simulate realistic user behaviour; (4) FastHttpUser (gevent-based) for high-concurrency with minimal resource overhead; (5) Environment-based configuration via locust.env and LOCUST_* env vars for headless CI runs; (6) Custom event hooks: request success/failure event.add_listener for Prometheus metrics export; (7) Prometheus exporter plugin with docker-compose stack (Locust master + 3 workers + Prometheus + Grafana); (8) Master-worker distributed setup: locust --master / locust --worker --master-host=master with auto-scaling workers; (9) Custom response assertions with catch_response() context manager for business logic validation (not just HTTP status); (10) Test data pool using SharedData thread-safe structure for user credential rotation; (11) CSV result export: --csv=results --html=report.html for CI artifacts; (12) GitHub Actions running Locust headlessly: locust -f locustfile.py --headless -u 1000 -r 100 --run-time 5m --csv=baseline. Generate complete locustfile.py for an API-heavy SaaS platform with multiple user personas.'
      },
      {
        id: 'artillery-js',
        name: 'Artillery (Node.js)',
        description: 'Cloud-scale load testing for APIs, WebSockets, and microservices.',
        prompt: 'Build an Artillery cloud-scale load testing framework — built-in support for REST, GraphQL, WebSockets, and Playwright browser tests, popular among Node.js teams and startups for its YAML-first design. Include: (1) artillery.yml with phases: [{duration: 60, arrivalRate: 10}, {duration: 300, arrivalRate: 100}, {duration: 60, arrivalRate: 10}] for warm-up, sustained, ramp-down; (2) Scenarios with multiple requests chaining via capture: {json: $.token, as: token} for auth token extraction; (3) Custom JavaScript processor functions using config.processor: "./custom.js" for dynamic payload generation and response assertions; (4) Payload files: config.payload with CSV data files for user credential and product ID rotation; (5) Before/after request hooks in processor for signed request handling (HMAC, JWT generation); (6) WebSocket load test scenarios using engine: ws with send/receive message pairs; (7) Playwright browser scenarios: engine: playwright with page.goto, page.fill, page.click for realistic browser load; (8) ensure thresholds: {p99: 2000, http.error_rate: 0.01} for CI pass/fail gates; (9) Artillery Cloud (artillery pro) integration: artillery run --record --key $ARTILLERY_KEY for dashboard and history; (10) AWS Fargate distributed run: artillery run-fargate artillery.yml for massive scale without managing infrastructure; (11) Custom metrics via context.vars and aggregate.counters for business KPIs; (12) GitHub Actions: run against staging with Slack webhook notification on threshold breach. Generate complete Artillery test suite for a REST and WebSocket-backed real-time application.'
      },
      {
        id: 'lighthouse-ci',
        name: 'Lighthouse CI (Core Web Vitals)',
        description: 'LCP/CLS/FID/INP regression testing in CI with performance budget assertions.',
        prompt: 'Build a Lighthouse CI performance testing framework. Include LCP, CLS, FID, and INP budget assertions for each route, Lighthouse CI server for historical trend storage, PR blocking when budgets are exceeded, desktop and mobile configuration presets, authenticated page testing with cookie injection, multi-URL batch audits, and GitHub Actions integration with summary comments showing before/after Core Web Vitals scores.'
      },
      {
        id: 'playwright-perf',
        name: 'Playwright Performance Tracing',
        description: 'Chrome Trace Events, long tasks, layout shift, and resource timing assertions.',
        prompt: 'Create a performance testing layer using Playwright trace collection and Chrome DevTools Protocol. Include long task detection thresholds, Cumulative Layout Shift capture during interactions, resource timing assertions (TTFB, DOMContentLoaded), network throttling presets (3G/4G/cable), main-thread blocking time budgets, memory heap snapshot comparisons between test runs, and CI integration that attaches trace files as artifacts.'
      },
      {
        id: 'websocket-load-testing',
        name: 'WebSocket & Real-Time Load Testing',
        description: 'k6 and Artillery WebSocket load tests for chat, streaming, and real-time collaboration apps.',
        prompt: 'Build a WebSocket and real-time load testing framework using k6 and Artillery. Include: (1) k6 WebSocket tests using ws.connect() — send/receive message round-trip latency assertions, message ordering verification, reconnection handling; (2) Concurrent connection scaling tests — ramp from 100 to 10,000 simultaneous WebSocket connections, assert server stability and message delivery rate; (3) Message throughput benchmarks — measure messages/second per connection, assert p95 delivery latency < threshold; (4) Subscription management tests — subscribe to topics, publish events, assert all subscribers receive events within SLA; (5) Server-Sent Events (SSE) load tests — hold long-lived HTTP connections, assert event delivery rate; (6) WebRTC signaling server load tests; (7) Artillery WebSocket scenarios with think time simulation; (8) Connection flood resilience tests (assert server rejects gracefully beyond max connections); (9) Message payload size tests — small vs large payload latency comparison; (10) Reconnection storm tests — simulate 1000 simultaneous reconnects, assert server recovers; (11) Grafana k6 Cloud integration for real-time load test dashboards; (12) GitHub Actions workflow with k6 binary. Include k6 and Artillery test scripts.'
      },
      {
        id: 'db-connection-pool-stress',
        name: 'Database Connection Pool Stress Testing',
        description: 'Connection pool exhaustion, query timeout, and deadlock detection under concurrent load.',
        prompt: 'Build a database connection pool stress testing framework using pytest, SQLAlchemy, and Locust. Include: (1) Connection pool exhaustion tests — spin up more threads than pool max, assert requests queue and eventually succeed (not fail immediately); (2) Pool timeout tests — configure short pool_timeout, assert TimeoutError raised and caught gracefully when all connections busy; (3) Connection leak detection tests — acquire connection in subprocess, kill subprocess without releasing, assert pool self-heals within recycle_seconds; (4) Concurrent query tests using threading.Thread — 100 threads each making queries simultaneously, assert all complete without deadlock; (5) Slow query impact tests — inject a slow query occupying one pool slot, assert other queries not blocked beyond SLA; (6) Deadlock detection and retry tests — create intentional write-write deadlock scenario, assert application retries and recovers; (7) Read replica routing tests — assert SELECT queries route to read replica under load; (8) Pool metrics assertions (QueuePool.checkedout, overflow) via SQLAlchemy engine events; (9) Locust load test simulating N users each with persistent connections; (10) PgBouncer / ProxySQL connection pooler configuration validation tests. Include conftest.py with pool fixtures and monitoring helpers.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 7. Security & Penetration Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'security-testing',
    name: 'Security & Penetration Testing',
    description: 'Automated DAST, SAST, IAST, and dependency scanning for secure applications.',
    icon: 'Shield',
    category: 'security',
    collection: 'governance-risk',
    domains: [
      'FinTech & Banking (PCI-DSS)', 'Healthcare (HIPAA)', 'E-Commerce',
      'Government (FedRAMP / NIST)', 'SaaS & Cloud-Native', 'IoT & Embedded',
      'Insurance & RegTech', 'Defense & Critical Infrastructure',
      'Telecom (SS7 / Diameter)', 'Media & Ad Tech'
    ],
    subTemplates: [
      {
        id: 'dast-zap',
        name: 'DAST with OWASP ZAP',
        description: 'Dynamic security scanning of running web applications.',
        prompt: 'Build an automated DAST security scanning pipeline using OWASP ZAP — the most widely used free DAST tool, integrated into CI/CD pipelines at thousands of companies for continuous security testing. Include: (1) ZAP Docker daemon mode API driver using python-owasp-zap-v2.4 with context session management; (2) Authenticated scan setup: login script automating form-based or OAuth2 login, session token extraction, and ZAP authentication configuration; (3) Active scan configuration: disable false-positive-prone rules, tune scan strength and threshold per alert risk; (4) Spider + AJAX Spider combination for full JavaScript SPA coverage; (5) Custom scan rules: enable SQL injection, XSS, CSRF, IDOR, XXE, path traversal, security header checks; (6) SARIF output format for GitHub Advanced Security integration (uploaded to code-scanning results); (7) Severity-based CI gate: FAIL build if any HIGH or CRITICAL alerts found (not suppressed); (8) False-positive suppression config file (zap.conf) maintained in version control; (9) ZAP automation framework YAML (automation.yaml) for reproducible scan configuration; (10) Baseline scan mode (zap-baseline.py) for rapid PR scanning vs full active scan for scheduled nightly; (11) HTML report generation with screenshot evidence of findings; (12) GitHub Actions with OWASP ZAP Docker action owasp/zap2docker-stable plus custom step for SARIF upload. Generate complete scanning pipeline for a REST API and web application.'
      },
      {
        id: 'sast-semgrep',
        name: 'SAST with Semgrep',
        description: 'Static source code analysis for security vulnerabilities.',
        prompt: 'Build a SAST pipeline using Semgrep — the modern, fast SAST tool trusted by Dropbox, Figma, and hundreds of security-conscious engineering teams for developer-friendly security scanning. Include: (1) Semgrep CI configuration scanning on every PR with semgrep --config auto covering OWASP Top 10 vulnerabilities; (2) Rule set selection: p/python, p/javascript, p/typescript, p/java, p/cwe-top-25, p/owasp-top-ten applied based on repo language; (3) Custom Semgrep rules for internal coding standards: detect hardcoded API keys, unsafe eval() usage, missing input sanitization, raw SQL string concatenation; (4) Pre-commit hook using pre-commit framework with semgrep hook for early developer feedback; (5) GitHub Advanced Security integration: SARIF output uploaded to security tab, inline PR annotations showing vulnerability location; (6) Semgrep App API integration for trend tracking: weekly new/resolved findings report; (7) Rule tuning workflow: false-positive suppression with # nosemgrep comment audit and review process; (8) Secrets detection rules: AWS keys, GitHub tokens, private keys, connection strings pattern detection; (9) Taint analysis rules tracking user input through to dangerous sinks (SQL, OS command, LDAP); (10) Dependency confusion attack detection rules (internal package names); (11) Semgrep Pro / OSS comparison: configure both and document rule coverage differences; (12) GitHub Actions pipeline: semgrep scan --config custom-rules.yml --config p/owasp-top-ten --sarif > results.sarif. Generate complete configuration with custom rules for a Node.js or Python web application.'
      },
      {
        id: 'dependency-scanning',
        name: 'Dependency & Container Scanning (Trivy / Snyk)',
        description: 'Scan open-source dependencies and Docker images for CVEs.',
        prompt: 'Build a comprehensive dependency and container security scanning framework using Trivy and Snyk — the industry’s leading tools used by Docker, Atlassian, and Cloudflare for supply chain security. Include: (1) Trivy filesystem scan: trivy fs . scanning for OS package CVEs, language dependency CVEs (npm/pip/go/maven), and IaC misconfigurations (Terraform, Dockerfile, Kubernetes YAML); (2) Trivy Docker image scan: trivy image myapp:latest with severity HIGH,CRITICAL threshold for CI gate; (3) Trivy SBOM generation: trivy image --format cyclonedx --output sbom.json for CycloneDX bill of materials; (4) Snyk CLI integration: snyk test for SCA, snyk container test for Docker, snyk iac test for Terraform policies; (5) Snyk severity threshold policy: --severity-threshold=high blocks CI on high/critical vulnerabilities; (6) Dependency exemption workflow: .snyk policy file with expiring exemptions and justification comments; (7) GitHub Actions integration: trivy-action and snyk/actions/node as separate CI steps with SARIF upload to GitHub Security tab; (8) Weekly PDF compliance report: aggregate trivy and snyk results, group by severity, compare to previous week delta; (9) License compliance check: trivy fs --scanners license — block GPL-licensed transitive dependencies from commercial software; (10) Container image hardening checks: non-root user, no SUID binaries, minimal base image score via Trivy; (11) Renovate/Dependabot integration: automated PRs fixing Trivy-detected outdated dependencies; (12) Slack alerting: webhook notification when new critical CVE discovered in production image. Generate complete scanning pipeline with GitHub Actions workflow.'
      },
      {
        id: 'api-security-testing',
        name: 'API Security Testing (OWASP API Top 10)',
        description: 'Automated OWASP API Top 10 testing for REST and GraphQL APIs.',
        prompt: 'Build an API security testing framework targeting OWASP API Top 10 (2023) — the definitive standard for API security testing used by security teams at financial institutions, healthcare providers, and cloud platforms. Include: (1) BOLA/IDOR tests (API1: Broken Object Level Authorization) — User A creates resource, User B attempts to access it, assert 403 returned; (2) Broken Authentication tests (API2) — expired JWT returns 401, manipulated JWT sub claim returns 403, missing Authorization header returns 401; (3) Broken Object Property Level Authorization (API3) — attempt mass assignment (send admin:true in PUT body), assert ignored; (4) Unrestricted Resource Consumption (API4) — send 1000 requests, assert 429 rate limiting kicks in, Retry-After header present; (5) Broken Function Level Authorization (API5) — regular user accesses admin-only DELETE endpoint, assert 403; (6) Unrestricted Access to Sensitive Business Flows (API6) — purchase 10000 units of limited stock in automated loop, assert business limit enforced; (7) Server-Side Request Forgery tests (API7) — inject URL-bearing payloads in webhook/callback fields, assert SSRF protection; (8) Security Misconfiguration (API8) — assert no debug headers, no stack traces in 500 responses, CORS not wildcard, HTTPS enforced; (9) Improper Inventory Management (API9) — probe v1/, v2/, beta/ endpoints for undocumented endpoints returning sensitive data; (10) Unsafe API Consumption (API10) — inject adversarial data through third-party integrations, assert input validated; (11) pytest + httpx async framework with fixtures per attack category; (12) GitHub Actions SARIF output integrated with GitHub Advanced Security. Generate 30+ security test cases.'
      },
      {
        id: 'secrets-pentest',
        name: 'Secrets Detection & Supply Chain Security',
        description: 'Detect leaked credentials and secure the software supply chain.',
        prompt: 'Build a secrets detection and supply chain security pipeline using Gitleaks, Trufflehog, and Sigstore — the modern approach to shift-left security used by teams at HashiCorp, Shopify, and GitHub itself. Include: (1) Gitleaks pre-commit hook: gitleaks protect --staged blocking commits containing secrets, with .gitleaks.toml allowlist for test fixtures and false positives; (2) Gitleaks CI scan: gitleaks detect --source . --baseline-path gitleaks-baseline.json detecting new secrets vs baseline; (3) Trufflehog git history scan: trufflehog git file://. --only-verified discovering verified live credentials (AWS key validity checked against API); (4) Trufflehog Docker image scan: trufflehog docker --image myapp:latest finding secrets baked into layers; (5) Custom secret pattern rules in Gitleaks config for internal credential formats (internal Vault tokens, signing keys, API key prefixes); (6) SLSA Level 3 provenance generation: slsa-verifier verify-artifact with GitHub OIDC identity for build provenance; (7) Cosign container image signing: cosign sign --key cosign.key myapp:latest and cosign verify in deployment pipeline; (8) Sigstore Rekor transparency log verification for artifact signatures; (9) SBOM attestation: cosign attest --predicate sbom.json for SBom document attachment to container image; (10) Dependabot + Renovate configuration for automated dependency updates triggered by secrets-related CVEs; (11) Secret rotation runbook generator: when a leak is detected, automated Jira ticket creation with rotation steps; (12) GitHub Actions workflow combining Gitleaks + Trufflehog on PR and push events with SARIF upload. Generate complete pipeline configuration.'
      },
      {
        id: 'iast-contrast',
        name: 'IAST — Interactive Runtime Security Analysis',
        description: 'Runtime vulnerability detection via instrumented agent during functional test runs.',
        prompt: 'Build an IAST testing pipeline using Contrast Security or Seeker agents. Include agent instrumentation in a Docker-based test environment, functional test suite execution (Playwright/JUnit) that triggers runtime analysis, vulnerability findings export to SARIF for GitHub Security tab, severity threshold gates that fail CI on critical findings, baseline suppression for accepted risks, and weekly triage reports showing new vs existing vulnerabilities.'
      },
      {
        id: 'sbom-dependency-track',
        name: 'SBOM & Supply Chain Security',
        description: 'SBOM generation with Syft/CycloneDX and continuous CVE monitoring via Dependency-Track.',
        prompt: 'Create a software supply chain security framework using Syft for SBOM generation and OWASP Dependency-Track for continuous CVE monitoring. Include CycloneDX SBOM generation per build artifact, automated upload to Dependency-Track, policy violation alerts for critical CVEs, license compliance checks against an allowlist, outdated dependency reports, GitHub Actions pipeline step blocking on policy violations, and weekly security dashboard in Confluence/Notion.'
      },
      {
        id: 'cspm-cloud-security-testing',
        name: 'CSPM — Cloud Security Posture Testing',
        description: 'Automated cloud configuration compliance tests using Prowler, Checkov, and ScoutSuite.',
        prompt: 'Build a Cloud Security Posture Management (CSPM) testing framework using Prowler, Checkov, and ScoutSuite. Include: (1) Prowler AWS/GCP/Azure security checks — run service-specific compliance scans (CIS, PCI-DSS, HIPAA, SOC2), assert zero CRITICAL findings; (2) Checkov IaC scanning — scan Terraform, CloudFormation, Kubernetes YAML for misconfigurations, fail pipeline on HIGH severity findings; (3) ScoutSuite multi-cloud posture scan and HTML report generation; (4) Custom Prowler check development for organization-specific security policies; (5) S3 bucket public ACL detection tests; (6) IAM over-permission detection (iam:* wildcard policy assertions); (7) Security group ingress rule validation (no 0.0.0.0/0 on port 22, 3389); (8) Encryption at rest validation for storage services (S3, RDS, EBS, Blob Storage); (9) Logging and monitoring coverage tests (CloudTrail, VPC Flow Logs, GuardDuty enabled assertions); (10) Drift detection — compare real-time cloud config against approved baseline; (11) GitHub Actions daily CSPM scan with Slack alert on new findings; (12) Compliance score tracking over time with trend reporting. Include YAML exclusion rules and scoring configuration.'
      },
      {
        id: 'secrets-rotation-testing',
        name: 'Secrets Rotation & Vault Integration Testing',
        description: 'Automated tests for secrets lifecycle, rotation workflows, and vault access policies.',
        prompt: 'Build a secrets management and rotation testing framework using HashiCorp Vault, AWS Secrets Manager, and Azure Key Vault. Include: (1) Vault dynamic secrets tests — request database credentials, verify short TTL, assert credentials expire and are auto-rotated; (2) Vault token renewal tests — assert client can renew token before expiry, assert expired token is rejected; (3) AWS Secrets Manager rotation test — trigger rotation lambda, assert new secret version active, assert old version deprecated; (4) Cross-service secrets injection tests — assert secrets correctly injected into Kubernetes pods via External Secrets Operator; (5) Secrets scanning tests using Trufflehog and GitLeaks — assert no secrets leaked in git history or container layers; (6) Just-in-time (JIT) access tests — request temporary elevated credentials, use them within TTL, assert revoked after TTL; (7) Vault policy tests — assert least-privilege paths (read-only role cannot write, admin-only paths blocked for app roles); (8) OIDC Workload Identity tests (Kubernetes service account to Vault role binding); (9) Vault audit log assertions — every credential access logged with requestor identity; (10) Key rotation ceremony tests — rotate encryption master key, assert all data re-encrypted and accessible. Include Vault Docker test fixture.'
      },
      {
        id: 'oauth-identity-attack-simulation',
        name: 'OAuth / Identity Attack Simulation',
        description: 'Automated tests for OAuth 2.0 flow vulnerabilities, token attacks, and OIDC misconfigurations.',
        prompt: 'Build an OAuth 2.0 and identity security testing framework. Include: (1) OAuth 2.0 authorization code flow security tests — PKCE enforcement (assert code_challenge required), state parameter CSRF protection (replay attack fails), redirect_uri whitelist validation (unknown redirect_uri returns 400); (2) Token security tests — expired access token returns 401, tampered JWT signature rejected, algorithm confusion attack (RS256 to HS256 downgrade) rejected; (3) Refresh token rotation tests — single-use enforcement (reused refresh token revokes session), refresh token leakage detection; (4) OIDC configuration scan using OpenID Configuration discovery endpoint (assert no weak algs, correct issuer, HTTPS endpoints only); (5) Implicit flow deprecation tests (assert implicit flow disabled); (6) Client credential grant abuse tests — assert scope limitation enforced; (7) Token introspection endpoint auth tests — assert endpoint requires valid client credentials; (8) Corporate SSO SAML tests — SAML response signature validation, ACS URL whitelist, XML injection prevention; (9) Broken access control tests — horizontal privilege escalation via JWT sub claim manipulation; (10) OAuth consent screen bypass tests. Include Burp Suite automation extensions and Python requests-based attack simulation scripts.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 8. Unit & Integration Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'unit-integration-testing',
    name: 'Unit & Integration Testing',
    description: 'Foundational test suites for individual components, services, and their integrations.',
    icon: 'TestTube2',
    category: 'unit',
    collection: 'core-engineering',
    domains: [
      'Microservices Architecture', 'Monolithic Applications', 'Serverless / FaaS',
      'Data Processing & ETL Services', 'Event-Driven Systems', 'ML / AI Pipelines',
      'Embedded & Edge Systems', 'ERP & Business Logic', 'Fintech Core Banking',
      'Healthcare Clinical Systems'
    ],
    subTemplates: [
      {
        id: 'junit5-java',
        name: 'JUnit 5 (Java / Kotlin)',
        description: 'Modern Java testing with parameterized tests, extensions, and parallel execution.',
        prompt: 'Build a comprehensive JUnit 5 testing framework for a Java/Kotlin microservice — the gold standard for JVM testing used by every major Java shop including Spring, Quarkus, and Micronaut teams. Include: (1) Test class organisation: @Nested classes grouping related scenarios, @DisplayName for readable test names; (2) @ParameterizedTest with @CsvSource, @MethodSource, and @EnumSource for data-driven tests without test duplication; (3) Custom JUnit 5 Extensions: @ExtendWith(MockitoExtension.class) for DI-free mocking, custom timing extension measuring slow tests; (4) Mockito 5 mocking: @Mock, @InjectMocks, @Spy, @Captor, ArgumentCaptor for complex interaction verification; (5) Testcontainers: @Testcontainers with @Container PostgresContainer and @Container RedisContainer for real DB/cache integration tests with automatic lifecycle; (6) Spring Boot Test: @SpringBootTest, @WebMvcTest, @DataJpaTest with TestEntityManager for realistic Spring context tests; (7) ArchUnit architectural tests: no class in service layer imports from web layer, no cycles between packages; (8) JaCoCo coverage: minimum 80% line + 75% branch coverage enforced in Maven build (failsafe rules); (9) WireMock server in JUnit 5 extension for mocking external HTTP dependencies; (10) AssertJ fluent assertions for readable multi-assertion chaining; (11) @TestMethodOrder execution control with @Order for stateful integration test sequences; (12) GitHub Actions with Maven surefire and failsafe parallel test execution. Generate 30+ tests for a REST microservice covering domain logic, service layer, repository, and controller layers.'
      },
      {
        id: 'pytest-python',
        name: 'pytest (Python)',
        description: 'Feature-rich Python testing with powerful fixture injection and plugins.',
        prompt: 'Build a comprehensive pytest testing framework for a Python service — the dominant Python testing tool used by Django REST Framework, FastAPI, SQLAlchemy, and every major Python data company. Include: (1) conftest.py with fixture hierarchy: function-scoped test client, module-scoped database transaction, session-scoped test database creation; (2) pytest-asyncio for async FastAPI/aiohttp endpoint testing with asyncio_mode = "auto"; (3) Parametrize for equivalence classes and boundary value analysis — separate happy path, edge case, and error condition parametrize sets; (4) Custom markers: @pytest.mark.smoke, @pytest.mark.slow, @pytest.mark.integration with pytest.ini filterwarnings and addopts -m "not slow" default; (5) unittest.mock.patch and pytest-mock mocker fixture for mocking external dependencies (S3, Redis, external APIs); (6) Testcontainers-python: PostgresContainer, RedisContainer in conftest.py session fixture for isolated integration tests; (7) Hypothesis — @given(st.integers(), st.text()) for property-based fuzzing of parser and validation functions; (8) pytest-cov with --cov-fail-under=80 threshold, branch coverage enabled; (9) Factory Boy factories for all SQLAlchemy/Django models with Faker-generated data; (10) pytest-xdist parallel execution: -n auto distributing tests across CPU cores for 4x speed; (11) Allure pytest with @allure.feature, @allure.story for BDD-style test documentation; (12) GitHub Actions with pytest --tb=short --junitxml=results.xml and JUnit report publishing. Generate 30+ tests for a REST API service with auth, CRUD, pagination, and error handling.'
      },
      {
        id: 'jest-vitest',
        name: 'Jest / Vitest (JavaScript / TypeScript)',
        description: 'Fast unit testing for Node.js backends and modern frontend frameworks.',
        prompt: 'Build a modern Jest and Vitest testing framework for a TypeScript Node.js backend and React/Vue frontend — the standard for JavaScript teams at Vercel, Supabase, linear, and most modern JS companies. Include: (1) Jest config (jest.config.ts) with projects array: one project for Node.js unit tests (node testEnvironment), one for React components (jsdom testEnvironment); (2) Vitest config (vitest.config.ts) as Jest-compatible alternative with native ESM support and 6x faster execution via Vite bundler; (3) React Testing Library with render(), screen queries (getByRole, getByText, getByLabelText — accessibility-first selectors), and userEvent (not fireEvent) for realistic interactions; (4) Module mocking with jest.mock() / vi.mock() for fs, axios, environment-specific imports; (5) MSW (Mock Service Worker) for realistic API mocking at the network level — no import interception needed; (6) Snapshot tests for stable component output — plus jest-styled-components for CSS-in-JS snapshot testing; (7) Custom render wrapper providing Redux store, React Query client, Router, and ThemeProvider to all component tests; (8) Integration tests with Supertest for Express endpoints inside Jest; (9) jest.spyOn for testing side effects (analytics.track called, localStorage.setItem called); (10) Test coverage with threshold: branches: 75, functions: 80, lines: 80; (11) CI optimization: --shard=1/4 GitHub Actions matrix for parallel execution, --bail=3 to stop on first 3 failures; (12) Storybook test integration: storybook-test-runner executing interaction tests from stories. Generate 30+ tests for auth, data fetching, form validation, and UI state management.'
      },
      {
        id: 'dotnet-xunit',
        name: 'xUnit / NUnit (.NET)',
        description: 'Robust .NET testing for C# services and ASP.NET Core APIs.',
        prompt: 'Create a modern .NET 8 testing framework using xUnit.v3 and NUnit — the de facto testing standard for C# teams at Microsoft partners, Azure ISVs, and .NET enterprise shops. Include: (1) xUnit v3 with new test metadata attributes, [Theory] + [MemberData] with IEnumerable<TheoryDataRow> for type-safe parametrized tests; (2) AutoFixture + AutoFixture.AutoMoq for zero-friction test data generation without tedious object construction; (3) Moq 4 mock setup: Mock<IRepository>().Setup(r => r.GetAsync(id)).ReturnsAsync(entity) with Verify() call counting assertions; (4) FluentAssertions: result.Should().BeEquivalentTo(expected).And.NotBeNull() for readable assertion chains; (5) Respawn’s Checkpoint for fast database reset between integration tests (faster than truncating tables manually); (6) Testcontainers.NET: SqlServerContainer, PostgreSqlContainer, RedisContainer with automatic pull and start; (7) ASP.NET Core WebApplicationFactory<Program> for in-process integration tests without a running server; (8) coverlet.msbuild for cross-platform coverage: dotnet test --collect:"XPlat Code Coverage", Codecov upload; (9) Architecture tests with NetArchTest: Layer dependencies enforced, no infrastructure leakage to domain; (10) xUnit parallelism: [assembly: CollectionBehavior(DisableTestParallelization = false)] for module-level parallelism; (11) FakeItEasy as alternative mocking library for cleaner syntax in some scenarios; (12) Azure DevOps or GitHub Actions with dotnet test --results-directory TestResults publishing JUnit XML. Generate 30+ tests for an ASP.NET Core Web API with Clean Architecture.'
      },
      {
        id: 'go-testing',
        name: 'Go Testing (testify + gomock)',
        description: 'Idiomatic Go testing with table-driven tests and interfaces.',
        prompt: 'Build an idiomatic Go testing framework using the standard library, testify, and gomock — the standard approach used by Go teams at Uber, Dropbox, Docker, and HashiCorp. Include: (1) Table-driven tests: testCases := []struct{ name, input, expected }{ {...}, {...} } range loop pattern — Go idiomatic and readable; (2) testify/assert and testify/require: assert.Equal(t, expected, actual), require.NoError(t) (halts on failure vs soft assert); (3) testify/suite: Suite struct embedding suite.Suite, SetupTest() / TearDownTest() lifecycle for stateful integration test groups; (4) gomock: mockgen -source=interface.go -destination=mock.go with ctrl.EXPECT().Method(gomock.Any()).Return(value); (5) Subtests using t.Run("subtest name", func(t *testing.T) {}) for organized test grouping; (6) Benchmarks: func BenchmarkMyFunc(b *testing.B) { for i := 0; i < b.N; i++ { ... } } with b.ResetTimer(); (7) Fuzzing: func FuzzParser(f *testing.F) with seed corpus and go test -fuzz=FuzzParser; (8) go-fuzz-corpus and testdata/ fixtures for file-based test inputs; (9) dockertest for real DB integration: RunWithOptions postgres:15 container, Retry() for connection readiness; (10) golangci-lint integration: staticcheck, errcheck, gosec exhaustive in CI; (11) go tool cover -html=coverage.out for visual coverage report, -coverprofile with 80% threshold; (12) GitHub Actions with gotestsum --format pkgname for readable CI output. Generate 30+ tests for a REST API or gRPC service covering domain, repository, and HTTP handler layers.'
      },
      {
        id: 'component-testing',
        name: 'Component Testing (Storybook + Chromatic)',
        description: 'Isolated UI component testing with visual docs and interaction tests.',
        prompt: 'Build a component testing framework using Storybook 8, Chromatic, and Testing Library. Include stories for every component state, interaction tests with play() functions, accessibility checks with storybook-addon-a11y, visual regression with Chromatic, coverage mapping to source components, and Chromatic CI integration for storybook review workflows.'
      },
      {
        id: 'phpunit-laravel',
        name: 'PHPUnit (Laravel / Symfony)',
        description: 'Unit and feature tests for PHP applications using PHPUnit and Laravel test helpers.',
        prompt: 'Build a PHPUnit testing framework for a Laravel or Symfony application. Include unit tests for service classes with PHPUnit mocks, feature tests using Laravel HTTP test client for endpoints, database factories and seeders for isolated test state, Eloquent model scoping tests, event and queue fake assertions, Pest PHP migration path, code coverage with Xdebug or PCOV, and GitHub Actions pipeline with MySQL service container.'
      },
      {
        id: 'rspec-ruby',
        name: 'RSpec (Ruby / Rails)',
        description: 'BDD-style unit and request specs for Ruby on Rails with FactoryBot and VCR.',
        prompt: 'Create an RSpec testing framework for a Ruby on Rails application. Include unit specs for service objects and POROs, request specs for API controllers with JSON schema matchers, FactoryBot factories for all models, Shoulda Matchers for validation and association assertions, VCR cassettes for external HTTP call playback, DatabaseCleaner strategies for test isolation, SimpleCov coverage reports, and GitHub Actions with bundler-cache.'
      },
      {
        id: 'rust-cargo-test',
        name: 'Rust cargo test + Criterion Benchmarks',
        description: 'Native Rust tests, property-based tests with proptest, and Criterion micro-benchmarks.',
        prompt: 'Build a Rust testing framework using cargo test, proptest, and Criterion. Include unit tests with #[cfg(test)] modules, integration tests in the tests/ directory, proptest strategies for property-based testing of parsers and data structures, Criterion benchmark groups with statistical noise filtering, cargo-llvm-cov coverage HTML reports, mocking with mockall macros, and GitHub Actions CI with sccache for fast rebuilds.'
      },
      {
        id: 'swift-testing-framework',
        name: 'Swift Testing Framework (Swift 6)',
        description: 'Modern Swift Testing macro-based tests, async/actor tests, and Xcode integration.',
        prompt: 'Build an iOS/macOS testing framework using the new Swift Testing framework (swift-testing, Swift 6). Include: (1) @Test macro declarations with descriptive display names and tag-based organisation; (2) Parameterised tests using @Test arguments — test multiple input values with a single test function; (3) #expect and #require assertion macros with rich failure diagnostics; (4) Async and actor-isolated test functions with structured concurrency; (5) Test suites with @Suite macro for namespace grouping; (6) Trait-based test configuration: .timeLimit(), .enabled(if:), .tags(); (7) XCTest compatibility layer for migrating existing XCTestCase tests; (8) Test parallelisation and serial execution control; (9) Xcode 16 integration and Xcode Cloud CI workflow; (10) Combine with Quick/Nimble for BDD-style specs alongside Swift Testing; (11) Swift Package Manager test manifest; (12) GitHub Actions with swift test --parallel; (13) Code coverage with Xcode coverage reports and Codecov upload. Include Package.swift and example feature test suite.'
      },
      {
        id: 'elixir-exunit-testing',
        name: 'Elixir ExUnit & Property-Based Testing',
        description: 'ExUnit test suites, StreamData property-based tests, Mox behaviour mocking, and Ecto sandbox.',
        prompt: 'Build an Elixir testing framework using ExUnit, StreamData, Mox, and Ecto SQL Sandbox. Include: (1) ExUnit test case organisation — use ExUnit.Case, async: true for parallel tests, describe blocks for feature grouping; (2) Setup and setup_all callbacks with on_exit cleanup; (3) StreamData property-based tests using ExUnitProperties — generate arbitrary inputs, assert invariants hold for all generated data; (4) Mox behaviour mocking — define behaviour module, implement mock with Mox, assert call expectations; (5) Ecto SQL Sandbox for database isolation — each test runs in a transaction rolled back after; (6) Bypass for HTTP dependency mocking (assert external API calls made with correct params); (7) ExVCR cassette recording/playback for third-party API tests; (8) GenServer state testing — start supervised process, call functions, assert state transitions; (9) Phoenix LiveView testing with live/2 and form interaction helpers; (10) Broadway pipeline integration tests with Broadway.DummyProducer; (11) mix test --cover and ExCoveralls for coverage HTML reports; (12) GitHub Actions with Elixir/OTP matrix. Include mix.exs, test_helper.exs, and example feature test.'
      },
      {
        id: 'kotlin-multiplatform-testing',
        name: 'Kotlin Multiplatform (KMP) Testing',
        description: 'Shared business logic tests for KMP using kotlin.test, Turbine, and Kotest.',
        prompt: 'Build a Kotlin Multiplatform (KMP) testing framework for shared business logic. Include: (1) kotlin.test common test module running on JVM, iOS (via XCTest bridge), and JS targets simultaneously; (2) Kotest framework with shared test specs in commonTest source set — FreeSpec, BehaviorSpec, DescribeSpec styles; (3) Turbine for Kotlin Flow testing — turbine.test { assertItem(), awaitComplete(), cancelAndIgnoreRemainingEvents() }; (4) MockK for multiplatform mocking of repository interfaces; (5) Platform-specific actual/expect test helpers (e.g., runTest with CoroutineTestScope); (6) ViewModel and UseCase unit tests with TestDispatcher and Fake repository implementations; (7) SQLDelight database tests using in-memory driver (SqliteDriver for Android, NativeSqliteDriver for iOS); (8) Network layer tests using Ktor client mock engine; (9) Shared preference/settings storage tests with multiplatform-settings; (10) KMP module-level test coverage with Kover; (11) Gradle CI tasks: allTests, koverHtmlReport; (12) GitHub Actions iOS and Android matrix. Include build.gradle.kts and example shared feature test.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 9. Database Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'database-testing',
    name: 'Database Testing',
    description: 'Validate stored procedures, schema migrations, data integrity, and query performance.',
    icon: 'HardDrive',
    category: 'database',
    collection: 'core-engineering',
    domains: [
      'Banking & Core Finance', 'Healthcare & Clinical Records', 'E-Commerce & OMS',
      'HR / ERP Systems', 'Analytics & Data Warehousing', 'Master Data Management',
      'Telecom & Billing', 'Manufacturing & Inventory', 'Insurance Claims',
      'Government Records'
    ],
    subTemplates: [
      {
        id: 'tsqlt-sqlserver',
        name: 'tSQLt (SQL Server)',
        description: 'T-SQL unit testing framework for stored procedures and views.',
        prompt: 'Create a SQL Server database testing framework using tSQLt. Include stored procedure unit tests, view output validation, fake table setup for isolation, captured vs expected result assertions, SCD Type 2 history table validation, trigger tests, rollback-based test isolation, and a PowerShell CI runner for Azure DevOps.'
      },
      {
        id: 'pgtap-postgres',
        name: 'pgTAP (PostgreSQL)',
        description: 'TAP-compliant unit tests directly in PostgreSQL.',
        prompt: 'Build a PostgreSQL database testing framework using pgTAP. Include function unit tests, schema-level assertions (column types, constraints, indexes), row-level data validations, partitioning correctness tests, privilege and RLS (row-level security) tests, pg_prove CI runner, and Docker-based test DB provisioning.'
      },
      {
        id: 'flyway-schema-tests',
        name: 'Schema Migration Testing (Flyway / Liquibase)',
        description: 'Test database schema migrations for correctness and rollback safety.',
        prompt: 'Build a schema migration testing framework using Flyway and Testcontainers. Include sequential migration validation, rollback/undo tests, data preservation checks across versions, multi-database dialect tests (PostgreSQL, MySQL, SQL Server), migration linting with SQLFluff, and CI pipeline with parallel DB version matrix.'
      },
      {
        id: 'nosql-testing',
        name: 'NoSQL Validation (MongoDB / DynamoDB)',
        description: 'Document and key-value store testing for schema and data integrity.',
        prompt: 'Build a NoSQL database testing framework for MongoDB and DynamoDB. Include document schema validation with Zod/Joi assertions, index effectiveness tests, aggregation pipeline unit tests (using mongomock/moto), TTL and lifecycle policy tests, cross-region replication consistency checks, and pytest-based test runner with teardown.'
      },
      {
        id: 'db-performance-testing',
        name: 'Query Performance Testing',
        description: 'Validate query execution plans, indexes, and database response under load.',
        prompt: 'Create a database performance testing framework. Include slow query detection with execution plan analysis, index coverage tests, connection pool stress tests with pgbench/sysbench, deadlock scenario tests, replication lag monitoring, automated EXPLAIN ANALYZE regression comparison between schema versions, and Grafana dashboard for DB metrics.'
      },
      {
        id: 'dbt-schema-tests',
        name: 'dbt Schema Tests & Assertions',
        description: 'YAML-based data quality tests for dbt models (not_null, unique, accepted_values).',
        prompt: 'Create a dbt data quality testing framework using dbt built-in schema tests and dbt-expectations package. Include not_null, unique, accepted_values, and relationships tests for every model, custom singular tests for business rules, dbt-expectations for row count ranges and column distribution checks, source freshness monitoring, test coverage reporting across all models, and Slack notifications for failing test runs in CI.'
      },
      {
        id: 'testcontainers-db',
        name: 'Testcontainers Database Isolation',
        description: 'Ephemeral Postgres/MySQL/MongoDB containers for fully isolated integration tests.',
        prompt: 'Build a database integration testing framework using Testcontainers (Java, Python, or Go). Include ephemeral Postgres/MySQL/MongoDB container lifecycle management per test suite, Flyway/Liquibase migration execution on startup, shared container strategy for performance optimization, data seeding helpers, parallel test execution with isolated schema per worker, and CI configuration with Docker-in-Docker or remote Docker daemon support.'
      },
      {
        id: 'cosmos-db-testing',
        name: 'Azure Cosmos DB Testing',
        description: 'Cosmos DB multi-model testing for SQL API, Gremlin, Cassandra, and MongoDB API with emulator.',
        prompt: 'Build an Azure Cosmos DB testing framework using the Azure Cosmos DB Emulator and pytest. Include: (1) Cosmos DB Emulator Docker container as pytest fixture (azure-cosmos-emulator Docker image) — start emulator, create test database and containers, run tests, tear down; (2) SQL API tests — create, read, update, delete items, cross-partition query assertions, parameterised query tests; (3) Partition key design tests — assert hot partition avoidance, uniform distribution of synthetic traffic; (4) Request Unit (RU) consumption tests — measure RU charge per operation, assert within provisioned throughput budget; (5) Change Feed tests — insert items, assert change feed processor delivers events within SLA; (6) TTL (Time-To-Live) expiration tests — set TTL on items, assert automatic deletion after TTL seconds; (7) Stored procedure, trigger, and UDF tests executed via SDK; (8) Optimistic concurrency (ETag) tests — assert conditional writes succeed on matching ETag, fail on stale ETag; (9) Cosmos DB for MongoDB API compatibility tests using PyMongo; (10) Cosmos DB Graph (Gremlin) traversal assertion tests; (11) Global distribution failover simulation tests; (12) GitHub Actions with Cosmos DB Emulator container. Include conftest.py and sample test collection.'
      },
      {
        id: 'mongodb-atlas-testing',
        name: 'MongoDB Atlas / Change Streams Testing',
        description: 'CRUD, aggregation pipeline, schema validation, and Change Streams tests for MongoDB.',
        prompt: 'Build a MongoDB Atlas testing framework using PyMongo, Motor (async), and pytest. Include: (1) CRUD operation tests — insert_one/many, find_one/find, update_one/many with $set/$inc/$push, delete_one/many with expected ModifiedCount assertions; (2) Aggregation pipeline tests — $match, $group, $lookup (join), $unwind, $facet stages with expected output assertion; (3) MongoDB JSON Schema validation tests — insert documents violating schema, assert WriteError raised; (4) Index coverage tests — run explain() with executionStats, assert IXSCAN used (not COLLSCAN); (5) Change Streams tests — open change stream, insert/update/delete document, assert operationType and fullDocument in event; (6) Atlas Search (Lucene) full-text search query tests with score assertions; (7) Transactions tests (multi-document ACID) — multi-collection update in transaction, simulate failure, assert rollback; (8) Atlas Data Federation query tests across S3 and Atlas collections; (9) Testcontainers MongoDB for CI isolation; (10) Motor async driver tests with asyncio test fixtures; (11) Mongomock for pure unit tests without running a server; (12) GitHub Actions with MongoDB Atlas free cluster or Testcontainers. Include conftest.py with Atlas connection and index setup.'
      },
      {
        id: 'cockroachdb-testing',
        name: 'CockroachDB / Distributed SQL Testing',
        description: 'Distributed transaction, serializable isolation, geo-partition, and survivability tests for CockroachDB.',
        prompt: 'Build a CockroachDB testing framework using pytest and psycopg2/psycopg3. Include: (1) Distributed transaction tests — multi-node write transaction with SERIALIZABLE isolation, assert no phantom reads; (2) Transaction retry logic tests — simulate transaction retry error (SQLSTATE 40001), assert application correctly uses retry loop with exponential backoff; (3) Serializable isolation conflict tests — concurrent writers on the same key, assert one succeeds and one retries; (4) Table partitioning tests — PARTITION BY RANGE/LIST, assert queries hit correct partition (locality-aware routing); (5) Multi-region table tests — assert REGIONAL BY ROW tables route writes to the closest region; (6) Sequence and UUID generation tests — assert no gaps in sequences under concurrent inserts; (7) Schema change under load tests — ADD COLUMN while concurrent DML ongoing, assert non-blocking with online schema change; (8) Bulk import IMPORT INTO tests for CSV/PARQUET files; (9) Backup and RESTORE tests — create backup, restore to new cluster, assert data integrity; (10) CockroachDB follower read tests (AS OF SYSTEM TIME) for stale-read performance; (11) Testcontainers CockroachDB for CI; (12) EXPLAIN ANALYZE plan regression tests. Include Docker Compose and migration fixtures.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 10. Cloud & Infrastructure Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'cloud-testing',
    name: 'Cloud & Infrastructure Testing',
    description: 'Validate IaC templates, cloud resource configuration, and infrastructure compliance.',
    icon: 'Cloud',
    category: 'cloud',
    collection: 'platform-reliability',
    domains: [
      'AWS', 'Microsoft Azure', 'Google Cloud Platform (GCP)', 'Multi-Cloud',
      'Kubernetes & Containers', 'Serverless / FaaS', 'Hybrid Cloud',
      'Edge Computing', 'Platform Engineering', 'DataOps & MLOps'
    ],
    subTemplates: [
      {
        id: 'terraform-tests',
        name: 'Terraform Testing (Terratest)',
        description: 'Automated infrastructure tests for Terraform modules using Go.',
        prompt: 'Build a Terraform infrastructure testing framework using Terratest. Include plan validation tests, apply/destroy lifecycle tests, resource attribute assertions, multi-region deployment tests, compliance checks with Open Policy Agent (OPA), Terragrunt integration, cost estimation gates with Infracost, and GitHub Actions workflow.'
      },
      {
        id: 'aws-cdk-assertions',
        name: 'AWS CDK Assertions',
        description: 'Unit and snapshot testing for AWS CDK stacks.',
        prompt: 'Build an AWS CDK testing framework using CDK Assertions library in TypeScript. Include unit tests for resource creation, property assertions, CloudFormation template snapshot tests, security group rule validation, IAM policy least-privilege checks, SNS/SQS/Lambda integration tests, and CodePipeline CI/CD integration.'
      },
      {
        id: 'checkov-iac-scan',
        name: 'IaC Security Scanning (Checkov / tfsec)',
        description: 'Static analysis of Terraform, CloudFormation, and Kubernetes manifests.',
        prompt: 'Build an IaC security scanning pipeline using Checkov and tfsec. Include scans for Terraform, CloudFormation, Kubernetes YAML, Helm charts, and Dockerfile. Add custom policy creation, severity-based CI gate, SARIF output for GitHub Security tab, exemption management, and weekly compliance scoring dashboard.'
      },
      {
        id: 'k8s-testing',
        name: 'Kubernetes Cluster Testing',
        description: 'Validate Kubernetes deployments, networking, RBAC, and resource limits.',
        prompt: 'Build a Kubernetes testing framework using kuttl and pytest-helm. Include deployment health tests (readiness probes, replicas), RBAC permission boundary tests, network policy enforcement tests, pod disruption budget validation, resource quota tests, Helm chart linting with chart-testing, and cluster upgrade regression tests.'
      },
      {
        id: 'pulumi-testing',
        name: 'Pulumi Infrastructure Testing',
        description: 'Test Pulumi stacks in Python, TypeScript, or Go with mocking.',
        prompt: "Build a Pulumi infrastructure testing framework using Pulumi's testing SDK. Include unit tests with mocked providers for resource property assertions, integration tests with stack lifecycle management, policy pack compliance tests, drift detection pipelines, cross-stack reference validation, and CI with Pulumi Deployments."
      },
      {
        id: 'azure-bicep-testing',
        name: 'Azure Bicep / ARM Template Testing',
        description: 'Validate Azure Bicep templates with PSRule for Azure, Bicep linting, and arm-ttk.',
        prompt: 'Build an Azure Bicep and ARM template testing framework. Include Bicep linting with bicep build --no-restore, PSRule for Azure compliance rule execution, arm-ttk best-practice checks, what-if deployment validation scripts, resource parameter constraint tests, policy effect simulation using Azure Policy Insights API, and GitHub Actions pipeline with subscription-scoped validation using a service principal.'
      },
      {
        id: 'cfn-taskcat',
        name: 'AWS CloudFormation Testing (TaskCat)',
        description: 'CloudFormation template linting and multi-region deployment testing with TaskCat.',
        prompt: 'Create an AWS CloudFormation testing framework using cfn-lint for static analysis and TaskCat for multi-region deployment validation. Include cfn-lint custom rules for organizational standards, TaskCat project configuration for parallel stacks across regions, parameter override files per environment, resource drift detection post-deployment, cleanup automation on failure, stack event log parsing for error classification, and GitHub Actions pipeline triggered on template file changes.'
      },
      {
        id: 'helm-chart-testing',
        name: 'Helm Chart Testing (helm-unittest / chart-testing)',
        description: 'Unit, lint, and installation tests for Helm charts using helm-unittest and ct CLI.',
        prompt: 'Build a Helm chart testing framework using helm-unittest, chart-testing (ct), and Pluto. Include: (1) helm-unittest YAML unit tests — test rendering of Deployment, Service, ConfigMap, Ingress, RBAC resources with various values.yaml overrides; (2) Template rendering assertions — assert correct image tags injected, resource limits set, env vars populated from secrets; (3) chart-testing lint validation — ct lint with enforced version bump and chart maintenance requirements; (4) Multi-values file testing — test default values, minimal values, and full feature-flag values combinations; (5) Pluto deprecated API detection — assert chart does not use deprecated or removed Kubernetes API versions; (6) Helm hook tests — pre-install, post-install, and pre-delete hook template rendering validation; (7) Subchart and dependency chart rendering tests; (8) chart-testing install tests — ct install deploys chart to kind cluster, runs helm test Pod to validate chart; (9) Helm rollback simulation test — deploy v1, upgrade to v2, trigger rollback, assert state restored; (10) Security scan — checkov Helm scanning for pod security standards and RBAC misconfigurations; (11) GitOps ArgoCD sync dry-run against rendered chart; (12) GitHub Actions with kind cluster and ct integration. Include helm-unittest test suite and values fixtures.'
      },
      {
        id: 'gcp-infrastructure-testing',
        name: 'GCP Infrastructure Testing (Terraform + inspec)',
        description: 'GCP-specific Terraform plan, InSpec compliance, and gcloud assertion tests for GCP resources.',
        prompt: 'Build a GCP infrastructure testing framework using Terraform, Chef InSpec, and the gcloud SDK. Include: (1) Terraform plan validation with Terratest for GCP — unit tests that call terraform.PlanAndShowWithStructOutputE and assert expected resources, modules, and variable values; (2) Terraform apply-and-destroy tests for GCP resources (GCE, GKE, Cloud SQL, Cloud Run, VPC, IAM); (3) Chef InSpec GCP profile checks — assert VPC subnets not public, GCS buckets not public, GKE binary authorisation enabled, Cloud SQL backup enabled; (4) gcloud CLI assertion tests — run gcloud commands via subprocess, assert resource properties JSON output; (5) GKE cluster configuration tests — assert Workload Identity enabled, private cluster mode, authorised networks configured; (6) Cloud IAM tests — assert no service accounts have project Owner role, assert VPC SC perimeter in place; (7) Cloud Armor WAF policy configuration tests; (8) BigQuery dataset access control tests; (9) Terraform module integration tests linking VPC, GKE, and Cloud SQL modules; (10) Cost estimation tests using Infracost GCP pricing; (11) GitHub Actions with Workload Identity Federation for GCP auth. Include InSpec profiles and Terratest examples.'
      },
      {
        id: 'terraform-cdk-testing',
        name: 'Terraform CDK (CDKTF) Testing',
        description: 'Unit and snapshot tests for CDKTF constructs in TypeScript/Python using Testing module.',
        prompt: 'Build a Terraform CDK (CDKTF) testing framework using the CDKTF Testing module (cdktf.testing). Include: (1) Construct unit tests — instantiate CDKTF stacks, call Testing.app() and assert toHaveResourceWithProperties() for each infrastructure resource; (2) Snapshot tests — assert synthesized Terraform JSON matches approved snapshot, catch unintended infrastructure changes; (3) Cloud Assembly validation — assert synthesized stack produces valid Terraform JSON with required providers; (4) Multi-stack dependency tests — assert cross-stack references resolve correctly via TerraformOutput and RemoteStateDataSource; (5) Custom construct tests — test reusable L2/L3 constructs with mocked provider adapters; (6) CDKTF Python tests using pytest and cdktf.testing.Testing class; (7) CDKTF TypeScript tests using Jest with Testing.toHaveResource matchers; (8) Diff-based regression test — compare synthesized JSON before and after code change, assert expected diff only; (9) Compliance checks using Checkov on synthesized JSON; (10) Cost estimation test using Infracost against synthesized plan; (11) GitHub Actions cdktf synth then checkov + infracost pipeline. Include Jest and pytest test suites with example VPC and database stack.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 11. Contract Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'contract-testing',
    name: 'Contract Testing',
    description: 'Consumer-driven contract tests to prevent integration breakages between services.',
    icon: 'FileText',
    category: 'contract',
    collection: 'core-engineering',
    domains: [
      'Microservices Ecosystems', 'Event-Driven Architecture', 'FinTech & Payment APIs',
      'Healthcare Interoperability (FHIR / HL7)', 'B2B & Partner APIs',
      'E-Commerce Platform APIs', 'Platform Engineering', 'Insurance Integration',
      'Telecom APIs', 'Government Open APIs'
    ],
    subTemplates: [
      {
        id: 'pact-js',
        name: 'Pact (JavaScript / TypeScript)',
        description: 'Consumer-driven contract testing for Node.js microservices.',
        prompt: 'Build a consumer-driven contract testing framework using Pact.js. Include consumer tests that define HTTP interaction expectations, provider verification tests, Pact Broker integration for contract sharing, can-i-deploy gates in CI, pending pacts workflow, WIP pacts, and GitHub Actions pipeline for both consumer and provider sides.'
      },
      {
        id: 'pact-java',
        name: 'Pact (Java / Spring)',
        description: 'Contract testing for Java microservices with Spring Cloud Contract support.',
        prompt: 'Build a Pact contract testing framework for Java Spring Boot microservices. Include consumer pact tests with MockMvc, provider verification with Spring Boot tests, Pact JVM annotations, Pact Broker publishing via Maven plugin, webhook-triggered provider builds, and Jenkins pipeline for contract verification gates.'
      },
      {
        id: 'spring-cloud-contract',
        name: 'Spring Cloud Contract',
        description: 'Server-side contract testing natively integrated with Spring.',
        prompt: 'Build a Spring Cloud Contract testing framework. Include Groovy/YAML contract definitions, auto-generated stubs for consumer tests, WireMock stub runner for consumer integration, contract verification tests on provider, messaging contracts for Kafka/RabbitMQ, and a Nexus stub registry deployment pipeline.'
      },
      {
        id: 'schemathesis',
        name: 'Schemathesis (OpenAPI Fuzzing)',
        description: 'Property-based API contract testing directly from OpenAPI specs.',
        prompt: 'Build an API contract and fuzzing framework using Schemathesis. Include OpenAPI 3.x spec-driven test generation, stateful testing with link objects, edge-case fuzzing (nulls, boundary values, special chars), response schema conformance assertions, custom checks for business rules, and GitHub Actions integration with issue auto-creation for failures.'
      },
      {
        id: 'pact-broker',
        name: 'Pact Broker + CI/CD Can-I-Deploy',
        description: 'Centralised Pact publication, versioning, and can-i-deploy release gates.',
        prompt: 'Build a Pact Broker integration for consumer-driven contract testing. Include Pact consumer tests with generated pact files, provider verification runs fetching pacts from the broker, can-i-deploy CLI checks in deployment pipelines to prevent breaking changes, webhook triggers for provider verification on pact publish, pending pacts and work-in-progress feature for safe provider-side feedback, and a Pact Broker hosted on Docker with sample HAL API navigation tests.'
      },
      {
        id: 'asyncapi-microcks',
        name: 'AsyncAPI Contract Testing (Microcks)',
        description: 'Kafka, WebSockets, and AMQP contract mocking and testing with Microcks.',
        prompt: 'Create an AsyncAPI contract testing framework using Microcks. Include AsyncAPI 3.x spec-driven mock setup for Kafka, WebSocket, and AMQP topics, consumer contract assertions on message schema and headers, producer verifications against published event payloads, Microcks Testcontainers integration for local test runs, CI pipeline publishing specs to a shared Microcks instance, and conformance score reporting per channel.'
      },
      {
        id: 'grpc-buf',
        name: 'gRPC Contract Testing (buf)',
        description: 'buf.build schema linting, breaking change detection, and mock gRPC servers.',
        prompt: 'Build a gRPC contract testing framework using buf.build. Include protobuf schema linting with buf lint, breaking change detection between API versions with buf breaking, mock gRPC server generation with grpc-mock for consumer tests, buf generate scripts for multi-language stub generation, proto file formatting enforcement, a buf.yaml module configuration with governed dependency pinning, and GitHub Actions CI with buf push to BSR on merge.'
      },
      {
        id: 'kafka-schema-registry',
        name: 'Kafka Schema Registry (Avro/Protobuf)',
        description: 'Schema compatibility tests BACKWARD/FORWARD/FULL for Avro and Protobuf schemas.',
        prompt: 'Create a Kafka Schema Registry testing framework for Avro and Protobuf schemas. Include compatibility rule tests (BACKWARD, FORWARD, FULL, TRANSITIVE variants), schema registration and evolution scripts, producer/consumer compatibility validation with embedded Kafka (Testcontainers), serialization round-trip tests, global/subject-level compatibility config tests, schema migration runbooks, and CI integration that blocks merges on compatibility violations.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 12. Accessibility Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'accessibility-testing',
    name: 'Accessibility Testing',
    description: 'WCAG 2.1/2.2 compliance testing for screen readers, keyboard navigation, and contrast.',
    icon: 'Accessibility',
    category: 'accessibility',
    collection: 'product-experience',
    domains: [
      'Government & Public Sector Portals', 'E-Commerce & Retail',
      'Healthcare Patient Portals', 'Banking & Financial Services',
      'Education & Learning Platforms', 'Media & Publishing',
      'Social & Community Platforms', 'Insurance Self-Service',
      'HR & Employee Portals', 'Non-Profit & NGO'
    ],
    subTemplates: [
      {
        id: 'axe-playwright',
        name: 'axe-core + Playwright',
        description: 'Automated WCAG scanning integrated into E2E test runs.',
        prompt: 'Build an accessibility testing framework using axe-core with Playwright. Include per-page WCAG 2.1 AA scans on every E2E test, custom rule configuration, violation filing as GitHub Issues via API, keyboard navigation tests, focus management assertions, and HTML report with screenshot evidence.'
      },
      {
        id: 'jest-axe',
        name: 'jest-axe (React / Vue Unit Level)',
        description: 'Unit-level accessibility tests for individual rendered components.',
        prompt: 'Build a component-level accessibility testing framework using jest-axe and Testing Library. Include axe matchers in all component tests, custom axe configuration for rule disabling, accessible name assertions, ARIA role validation, color contrast checking utility, and Storybook addon-a11y integration for visual docs.'
      },
      {
        id: 'pa11y-ci',
        name: 'Pa11y CI (Sitemap Crawl)',
        description: 'Automated WCAG compliance crawl across entire web application sitemaps.',
        prompt: 'Build a Pa11y CI accessibility testing pipeline. Include sitemap-driven page crawl, WCAG2AA/AAA standard configuration, authentication handling for protected pages, threshold-based CI pass/fail, structured JSON and HTML reports, issue severity triage logic, and weekly email reporting of new violations vs. resolved issues.'
      },
      {
        id: 'manual-a11y-checklist',
        name: 'Manual Accessibility Test Framework',
        description: 'Structured checklists and protocols for screen reader and keyboard testing.',
        prompt: 'Create a comprehensive manual accessibility testing framework. Generate detailed WCAG 2.1 AA/AAA checklists organized by criterion (Perceivable, Operable, Understandable, Robust), screen reader testing scripts for NVDA + JAWS + VoiceOver, keyboard trap detection protocols, zoom/reflow testing procedures, and an Excel/JSON test case library with expected outcomes and evidence templates.'
      },
      {
        id: 'mobile-a11y',
        name: 'iOS VoiceOver / Android TalkBack Testing',
        description: 'Screen reader automation testing for iOS and Android mobile apps.',
        prompt: 'Build a mobile accessibility testing framework. Include XCUITest accessibility label and trait assertions for iOS VoiceOver, Android AccessibilityChecks integration with Espresso for TalkBack, Appium screen reader interaction flows, tab order verification, content description completeness checks, minimum touch target size validation (44x44pt), focus indicator visibility tests, and automated accessibility audit reports per screen with WCAG 2.1 criterion cross-references.'
      },
      {
        id: 'keyboard-navigation',
        name: 'Keyboard Navigation Testing (Playwright)',
        description: 'Tab-focus order, focus trap, keyboard shortcuts, and skip-link testing.',
        prompt: 'Create a keyboard navigation testing framework using Playwright. Include tab order traversal assertions comparing expected focus sequence, focus trap validation in modal dialogs and slide-overs, Enter/Space/Escape/Arrow key interaction tests for custom widgets, skip-link activation and destination focus tests, keyboard shortcut conflict detection, :focus-visible indicator visibility assertions using getComputedStyle, and a JSON report mapping each interactive element to its keyboard test status.'
      },
      {
        id: 'color-contrast-wcag',
        name: 'Automated Color Contrast & WCAG 2.2 Audit',
        description: 'IBM Equal Access, axe color-contrast rules, and AA/AAA threshold enforcement.',
        prompt: 'Build an automated color contrast and WCAG 2.2 audit framework using IBM Equal Access Checker and axe-core color-contrast rules. Include page-level contrast ratio extraction for all text/background combinations, normal and large text AA (4.5:1 / 3:1) and AAA (7:1 / 4.5:1) threshold assertions, non-text contrast checks for UI components (3:1), focus indicator contrast validation from WCAG 2.2, dark/light theme coverage, and CI HTML reports grouped by severity.'
      },
      {
        id: 'aria-landmark-testing',
        name: 'ARIA Landmark & Role Testing',
        description: 'ARIA roles, aria-label completeness, live regions, and dialog focus management.',
        prompt: 'Create an ARIA landmark and role testing framework using Playwright and axe-core. Include landmark region coverage tests (main, nav, banner, contentinfo), aria-label and aria-labelledby completeness checks for all interactive elements, live region announcement timing tests using speech synthesis mocks, dialog/modal focus management assertions (focus on open, return on close, trap in between), combobox/listbox keyboard interaction conformance, and a test report mapping ARIA failures to WCAG 4.1.2 criterion.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 13. Chaos Engineering
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'chaos-engineering',
    name: 'Chaos Engineering',
    description: 'Proactively test system resilience by injecting controlled failures in production-like environments.',
    icon: 'Shuffle',
    category: 'chaos',
    collection: 'platform-reliability',
    domains: [
      'E-Commerce & Flash Sales', 'Banking & Trading Systems', 'Video Streaming Platforms',
      'Healthcare Critical Systems', 'SaaS Multi-Tenant Platforms', 'Microservices Ecosystems',
      'Telecom Network Infrastructure', 'Government High-Availability Services',
      'IoT & Edge Computing', 'AI / ML Inference Services'
    ],
    subTemplates: [
      {
        id: 'litmus-chaos',
        name: 'LitmusChaos (Kubernetes)',
        description: 'Cloud-native chaos engineering for Kubernetes workloads.',
        prompt: 'Build a chaos engineering framework using LitmusChaos for Kubernetes. Include ChaosEngine experiments for pod delete, node CPU hog, network latency injection, and disk fill. Add steady-state hypothesis validation, Argo Workflow orchestration for multi-step scenarios, Slack alerting, Grafana chaos event overlays, and GitOps-based chaos scheduling.'
      },
      {
        id: 'chaos-toolkit',
        name: 'Chaos Toolkit (Python)',
        description: 'Open-source chaos experiments as code with provider plugins.',
        prompt: 'Build a chaos engineering framework using Chaos Toolkit with AWS and Kubernetes drivers. Include JSON-based experiment definitions for EC2 instance termination, Lambda throttling, DB failover injection, and network partition simulation. Add steady-state probes, rollback actions, Prometheus metrics integration, and CI/CD pipeline for scheduled resilience drills.'
      },
      {
        id: 'resilience4j-testing',
        name: 'Resilience Patterns Testing (Resilience4j)',
        description: 'Test circuit breaker, retry, rate limiter, and bulkhead patterns in Java.',
        prompt: 'Create a resilience pattern testing framework using Resilience4j and JUnit 5. Include unit tests for circuit breaker state transitions, retry backoff validation under simulated failures, rate limiter rejection tests, bulkhead thread isolation tests, timeout behavior under slow dependency simulation using WireMock, and metrics assertion with Micrometer/Prometheus.'
      },
      {
        id: 'aws-fis',
        name: 'AWS Fault Injection Service (FIS)',
        description: 'Cloud-managed chaos experiments on AWS infrastructure.',
        prompt: 'Build an AWS Fault Injection Service (FIS) chaos testing framework. Include experiment templates for EC2/ECS instance termination, RDS failover, network latency injection, SSM Run Command disruption, and IAM deny injection. Add CloudWatch synthetic canary monitors for steady-state, automated stop conditions, experiment logging to S3, and Python boto3 orchestration scripts.'
      },
      {
        id: 'gremlin-chaos',
        name: 'Gremlin Managed Chaos Platform',
        description: 'API-driven failure injection for CPU, memory, network, disk, and shutdown attacks.',
        prompt: 'Build a Gremlin-based chaos engineering framework. Include API-driven attack scenarios for CPU/memory resource exhaustion, network latency and packet loss injection, disk I/O fill attacks, process termination, and time skew experiments. Add steady-state hypothesis checks via synthetic monitors, automated rollback triggers, Gremlin Failure Flags for code-level chaos, scheduled GameDay scenario scripts, and a Confluence runbook template capturing hypothesis, blast radius, and learnings.'
      },
      {
        id: 'azure-chaos-studio',
        name: 'Azure Chaos Studio',
        description: 'Azure-native fault injection for VMs, AKS, App Service, and Service Bus.',
        prompt: 'Create an Azure Chaos Studio testing framework. Include experiment templates for VM CPU pressure and shutdown, AKS pod kill and network delay faults, App Service stop/start faults, Service Bus outage simulation, and Cosmos DB region failover. Add Application Insights synthetic monitors as steady-state guards, automated experiment execution via Azure CLI/SDK, result collection from Azure Monitor Metrics, and GitHub Actions integration with experiment status polling.'
      },
      {
        id: 'steady-state-hypothesis',
        name: 'Steady-State Hypothesis Framework',
        description: 'Define observable baselines validated before and after fault injection.',
        prompt: 'Build a steady-state hypothesis validation framework using Chaos Toolkit. Include hypothesis probes for HTTP health checks, Prometheus SLO metric thresholds, database connectivity, queue depth bounds, and error rate ceilings. Define rollback actions paired with each fault, probe retry policies, tolerance bands for flapping metrics, multi-environment hypothesis configuration files, and a structured markdown report template with hypothesis result and blast radius assessment.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 14. CI/CD Pipeline Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'cicd-testing',
    name: 'CI/CD Pipeline Testing',
    description: 'Validate build pipelines, deployment gates, rollback procedures, and release quality.',
    icon: 'GitBranch',
    category: 'cicd',
    collection: 'platform-reliability',
    domains: [
      'Microservices & Container Apps', 'Monolithic Applications', 'Data Platform & dbt',
      'ML / AI Pipeline & MLOps', 'Mobile (iOS & Android)', 'Embedded & Firmware',
      'Serverless & Lambda', 'Helm / Kubernetes Deployments',
      'SAP & ERP Systems', 'Multi-Cloud Multi-Region'
    ],
    subTemplates: [
      {
        id: 'github-actions-testing',
        name: 'GitHub Actions Pipeline Testing',
        description: 'Validate GitHub Actions workflows with act and workflow tests.',
        prompt: 'Build a CI/CD pipeline testing framework for GitHub Actions. Include workflow validation with action-validator, local execution with act for rapid iteration, matrix strategy for multi-language/platform tests, secret masking validation, artifact integrity checks, deployment gate tests with environment protection rules, rollback smoke tests, and SLA-based pipeline duration monitoring.'
      },
      {
        id: 'jenkins-pipeline-testing',
        name: 'Jenkins Pipeline Testing (JenkinsPipelineUnit)',
        description: 'Test Jenkins Declarative and Scripted pipelines with unit tests.',
        prompt: 'Build a Jenkins pipeline testing framework using JenkinsPipelineUnit. Include unit tests for shared library steps, mock for external tool calls (kubectl, Docker, Helm), failure scenario simulation, stage skip logic validation, parallel execution correctness tests, and a dedicated Jenkins test job that validates pipeline changes on PRs.'
      },
      {
        id: 'deployment-smoke-tests',
        name: 'Deployment Smoke & Canary Tests',
        description: 'Automated health checks and canary verification after each deployment.',
        prompt: 'Build a post-deployment smoke and canary testing framework. Include readiness health-check polling, critical user journey smoke tests using Playwright, canary traffic comparison (blue/green), database migration verification, dependent service contract re-verification, rollback trigger logic on threshold breach, and PagerDuty incident auto-creation on failures.'
      },
      {
        id: 'gitops-argocd-tests',
        name: 'GitOps Validation (ArgoCD)',
        description: 'Test GitOps sync health and Kubernetes manifest correctness.',
        prompt: 'Build a GitOps testing framework for ArgoCD-based deployments. Include manifest validation with kubeval/kube-score, Helm chart unit tests, ArgoCD Application sync status checks, out-of-sync drift detection tests, progressive delivery (Argo Rollouts) analysis tests, multi-cluster deployment verification, and Prometheus-based deployment success metrics.'
      },
      {
        id: 'gitlab-ci-testing',
        name: 'GitLab CI/CD Pipeline Testing',
        description: 'GitLab CI YAML validation, downstream triggers, and rules/needs dependency graphs.',
        prompt: 'Build a GitLab CI/CD pipeline testing framework. Include gitlab-ci-lint API validation scripts for all .gitlab-ci.yml files, DAG dependency graph visualization via needs keyword validation, rules/only/except branch filter unit tests, downstream pipeline trigger and status polling, GitLab Environments and deployment tracking tests, cache and artifact retention verification, dynamic child pipeline generation tests, and CI pipeline execution time regression tracking with alerts.'
      },
      {
        id: 'azure-devops-gates',
        name: 'Azure DevOps Release Gates',
        description: 'YAML pipeline validation, pre/post-deployment gates, and Test Plans integration.',
        prompt: 'Create an Azure DevOps pipeline testing framework. Include Azure Pipelines YAML schema validation, pre-deployment gate scripts querying Application Insights error rates and availability tests, post-deployment smoke test tasks, release variable group validation, service connection permission tests, Test Plans integration for manual test case execution tracking, environment approval policy verification, and a PowerShell gate script library for reusable deployment readiness checks.'
      },
      {
        id: 'circleci-orb-testing',
        name: 'CircleCI Orb Testing',
        description: 'CircleCI config validation, orb dev kit testing, and local executor verification.',
        prompt: 'Build a CircleCI configuration and orb testing framework. Include circleci config validate scripts for all pipeline configs, orb development kit (orb-tools) usage for orb unit and integration tests, local executor testing with circleci local execute, parameter matrix testing for job variants, context and environment variable injection verification, scheduled pipeline trigger tests, and a changelog-enforced orb versioning workflow with semantic-release.'
      },
      {
        id: 'release-readiness',
        name: 'Release Readiness Scoring',
        description: 'Aggregate coverage, failures, performance, and security into a go/no-go gate.',
        prompt: 'Create a release readiness scoring framework. Include signal collection from test coverage (minimum 80%), test pass rate, performance regression comparison (p95 latency delta), security vulnerability count (zero criticals), accessibility audit score, and change failure rate trend. Compute a weighted composite readiness score, generate a release dashboard HTML report, post a go/no-go verdict as a GitHub commit status, and send a Slack summary card with drill-down links to each signal source.'
      },
      {
        id: 'tekton-pipeline-testing',
        name: 'Tekton Pipeline Testing',
        description: 'Unit and integration tests for Tekton Tasks, Pipelines, and Triggers on Kubernetes.',
        prompt: 'Build a Tekton CI pipeline testing framework. Include: (1) Tekton Task unit tests using tekton-cli (tkn) and kubectl — apply Task manifest, create TaskRun with test inputs, assert TaskRun status=Succeeded and log output matches expected; (2) Pipeline integration tests — apply Pipeline and PipelineRun manifests, wait for completion with tkn pipelinerun watch, assert all Tasks completed and PipelineRun status=Succeeded; (3) Parameter and workspace binding tests — test Task with various param combinations, assert correct output artifact; (4) Tekton Results API tests — query past run results, assert result storage and retrieval; (5) Trigger tests — curl Tekton EventListener with test webhook payload, assert TriggerBinding extracted correct fields and PipelineRun was created; (6) ClusterTask and remote task resolution tests; (7) Error path tests — inject failure in a Task step, assert Pipeline retries or fails correctly per onError config; (8) Tekton Chains supply chain security tests — assert signed provenance generated for each TaskRun; (9) RBAC tests — assert ServiceAccount has minimum required permissions; (10) Tekton Dashboard API tests; (11) kind cluster with Tekton installed as CI environment; (12) GitHub Actions running Tekton integration tests on kind. Include YAML manifests and test runner script.'
      },
      {
        id: 'argo-workflows-testing',
        name: 'Argo Workflows / Argo CD Testing',
        description: 'Workflow template tests, GitOps sync tests, and rollout strategy tests for Argo.',
        prompt: 'Build an Argo Workflows and Argo CD testing framework. Include: (1) Argo Workflows Template unit tests — submit WorkflowTemplate with test inputs via Argo Server API, poll until completion, assert outputs and step status; (2) DAG and Steps workflow dependency tests — assert correct execution order, assert parallel steps ran concurrently; (3) Argo Workflows retry and error handling tests — inject step failure, assert retry policy triggers correct number of retries; (4) Workflow parameter and artifact passing tests — assert output artifact from step A correctly fed into step B; (5) Argo CD Application sync tests — push Git change, assert Argo CD detects diff within sync timeout, assert ArgoApp health=Healthy and sync=Synced; (6) Argo CD multi-cluster deployment tests — assert Application deployed to correct target cluster; (7) Argo CD PreSync and PostSync hook tests; (8) Argo Rollouts canary deployment tests — assert traffic split percentages via weighted VirtualService, assert automatic promotion after metric threshold met; (9) Argo Rollouts bluegreen cutover tests; (10) RBAC and AppProject restriction tests; (11) kind cluster with full Argo suite installed; (12) GitHub Actions integration. Include Workflow manifests, Application YAML, and test scripts.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 15. IoT & Embedded Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'iot-testing',
    name: 'IoT & Embedded Testing',
    description: 'Testing frameworks for IoT devices, firmware, MQTT brokers, and edge computing.',
    icon: 'Cpu',
    category: 'iot',
    collection: 'specialized-systems',
    domains: [
      'Smart Home & Consumer IoT', 'Industrial IoT (IIoT) & SCADA', 'Healthcare Devices & FDA',
      'Automotive & Connected Vehicles', 'Smart City & Infrastructure', 'Wearables & Health Monitors',
      'Agriculture & Precision Farming', 'Energy Grid & Smart Meters', 'Retail IoT & POS',
      'Logistics & Asset Tracking'
    ],
    subTemplates: [
      {
        id: 'mqtt-testing',
        name: 'MQTT Broker & Device Testing',
        description: 'Test MQTT pub/sub messaging for IoT device communication.',
        prompt: 'Build an IoT MQTT broker testing framework using pytest, Paho-MQTT, and HiveMQ — the tooling used by industrial IoT platforms at Bosch, BMW, and Siemens. Include: (1) broker connectivity tests via Paho-MQTT client using Testcontainers HiveMQ or Mosquitto Docker image as pytest session fixture; (2) topic publish and subscribe round-trip tests with synchronous wait using threading.Event for delivery confirmation; (3) QoS level behavioral tests (0: fire-and-forget, 1: at-least-once, 2: exactly-once) asserting delivery counts; (4) Retained message tests — publish retained=True, reconnect new subscriber, assert message immediately received; (5) LWT (Last Will and Testament) tests — register will topic, abruptly disconnect, assert will message delivered to subscribers; (6) Payload schema validation using Pydantic models against incoming MQTT JSON payloads; (7) Topic access control tests — ACL-configured broker rejects unauthorized subscriptions; (8) Stress tests simulating 1000 concurrent virtual device publishers using asyncio MQTT with throughput and message loss rate assertions; (9) MQTT 5.0 feature tests: user properties, shared subscriptions, response topic / correlation data; (10) Message order tests — assert messages within a single topic arrive in sequence; (11) TLS-secured MQTT connection tests using client certificates; (12) GitHub Actions with HiveMQ Community Edition container. Generate 20+ tests covering device telemetry, command-and-control, and broker resiliency scenarios.'
      },
      {
        id: 'robot-framework-embedded',
        name: 'Robot Framework (Device / Hardware)',
        description: 'Keyword-driven acceptance testing for embedded and hardware systems.',
        prompt: 'Build an embedded and hardware testing framework using Robot Framework — the approach used by device QA teams at companies like Nokia, Siemens, and Continental. Include: (1) Robot Framework project structure: Resources/, Libraries/, Tests/ with separate suites for unit, integration, and system tests; (2) Custom Python keyword library wrapping pyserial for UART command/response testing on serial port fixtures; (3) GPIO state validation keywords via RPi.GPIO or periphery library asserting pin HIGH/LOW states after firmware commands; (4) I2C/SPI peripheral tests using smbus2 and spidev libraries validating register reads/writes; (5) Hardware-in-the-loop (HIL) test bed setup with Robot Framework connecting to physical device under test via USB/serial; (6) Robot Framework pabot parallel execution for multi-device test farms; (7) Firmware OTA update validation keywords — trigger update, monitor UART progress log, assert version reported after reboot; (8) Power consumption measurement keywords via USB power monitor (Otii Arc, Nordic PPK2) asserting power within budget; (9) Test report generation with Robot Framework HTML log + JIRA Xray test execution import via REST API; (10) Mock hardware stubs using virtual serial ports (socat) for CI environments without physical hardware; (11) Timeout and retry keywords for flaky hardware interaction with configurable retry backoff; (12) GitHub Actions CI with virtual device emulators (QEMU ARM) for offline tests. Generate 20+ tests for embedded sensor device covering boot sequence, sensor reading, command handling, and OTA update.'
      },
      {
        id: 'device-twin-testing',
        name: 'Azure IoT Hub / AWS IoT Core Testing',
        description: 'Test device shadow/twin synchronization and cloud connectivity.',
        prompt: 'Build a cloud IoT testing framework for Azure IoT Hub and AWS IoT Core — the platforms used by enterprise IoT teams at Honeywell, Carrier, and GE Digital. Include: (1) Azure IoT Hub device twin tests — set desired properties via service SDK, assert device twin reported properties sync within timeout using polling; (2) AWS IoT Core device shadow tests — update shadow desired state, simulate device acceptance, assert shadow reported state matches; (3) Azure IoT Hub direct method invocation tests — invoke method via service client, assert device receives method with correct name and payload, returns 200 status; (4) AWS IoT Core Rule Engine tests — publish device telemetry, assert Rule triggers Lambda or DynamoDB write via polling; (5) Device telemetry ingestion validation — publish 1000 messages at 10 msg/s, assert all reach IoT Hub event processing; (6) DPS (Device Provisioning Service) enrollment and provisioning tests — register device, assert assigned to correct IoT Hub; (7) X.509 certificate authentication tests — connect device with valid cert, assert authentication succeeds; connect with expired cert, assert rejected; (8) Device-to-cloud and cloud-to-device message tests via MQTT and AMQP protocols; (9) Azure Digital Twins model tests — create twin, set properties, query twin graph; (10) AWS IoT Greengrass component deployment tests; (11) Testcontainers with Azure IoT Hub Emulator or LocalStack for offline CI; (12) GitHub Actions with boto3/azure-iot-hub SDK. Generate 20+ tests for industrial sensor device fleet management scenarios.'
      },
      {
        id: 'firmware-unit-tests',
        name: 'Firmware Unit Testing (Ceedling / Unity)',
        description: 'C/C++ unit tests for embedded firmware using Ceedling and CMock.',
        prompt: 'Build a firmware unit testing framework using Ceedling, Unity, and CMock — the industry standard for embedded C testing used at ARM, STMicroelectronics, and Renesas ecosystem partners. Include: (1) Ceedling project structure (project.yml, src/, test/, mocks/) with Unity test runner auto-generation; (2) HAL abstraction layer unit tests — mock hardware registers with CMock-generated stubs, test driver functions without physical hardware; (3) Peripheral driver tests (UART, SPI, I2C) using CMock mocks for HAL functions, asserting correct byte sequences sent/received; (4) State machine transition tests — exercise every valid state transition and assert guard conditions and entry/exit actions; (5) RTOS task tests — mock xQueueSend/xQueueReceive (FreeRTOS), assert task behavior under empty queue, full queue, and timeout conditions; (6) Buffer overflow and boundary tests — fill buffer to capacity, attempt overflow, assert error code and no memory corruption; (7) Timer and delay mock tests — use Unity fixtures to inject fake tick counts, test timeout logic; (8) CMock argument capture tests — assert function called with exact register address and bit mask values; (9) Coverage via gcov integration in Ceedling — assert line and branch coverage thresholds per module; (10) Unity test report in JUnit XML format for CI integration; (11) Static analysis with cppcheck and PC-lint integration in build pipeline; (12) GitHub Actions CI using Docker image with arm-none-eabi-gcc and Ceedling. Generate 20+ tests for a temperature sensor driver and thermostat state machine.'
      },
      {
        id: 'mqtt5-coap',
        name: 'MQTT 5.0 & CoAP Protocol Testing',
        description: 'Test MQTT 5.0 features and CoAP endpoints for IoT messaging protocols.',
        prompt: 'Build an IoT protocol testing framework for MQTT 5.0 and CoAP. Include MQTT 5.0 feature tests for user properties, shared subscriptions, message expiry, flow control, and reason codes; broker-level QoS 0/1/2 delivery guarantee tests; CoAP GET/PUT/POST/DELETE method tests using Eclipse Californium; CoAP observe and block-wise transfer validation; DTLS-secured endpoint tests; and a Mosquitto Docker test broker fixture with retained message and will message verification.'
      },
      {
        id: 'edge-inference',
        name: 'Edge Inference Testing (TFLite / ONNX)',
        description: 'On-device ML inference accuracy, latency, and memory footprint for constrained hardware.',
        prompt: 'Create an edge inference testing framework for TensorFlow Lite and ONNX Runtime models. Include model accuracy parity tests comparing mobile-optimized vs full-precision model outputs, per-layer latency profiling on ARM Cortex-A and Cortex-M targets, memory footprint assertions within device RAM constraints, quantization accuracy degradation threshold tests, ONNX model validation with onnxruntime, hardware-in-the-loop testing via CI-connected Raspberry Pi, and automated performance regression reports per model version.'
      },
      {
        id: 'modbus-opcua-testing',
        name: 'Modbus / OPC-UA Industrial Protocol Testing',
        description: 'Protocol-level testing for industrial IoT using Modbus TCP and OPC-UA stacks.',
        prompt: 'Build an industrial protocol testing framework for Modbus TCP/RTU and OPC-UA. Include: (1) Modbus TCP client tests using pymodbus — read coils, discrete inputs, holding registers, input registers; assert register values within expected ranges; (2) Modbus write tests — write single and multiple registers/coils, assert echo-back read reflects written value; (3) Modbus exception code tests — request invalid function code or out-of-range register, assert correct Modbus exception response; (4) Modbus connection resilience tests — disconnect during read, assert client reconnects within timeout; (5) OPC-UA client tests using Python opcua/asyncua library — connect to OPC-UA server, browse node tree, read node values, subscribe to data change notifications; (6) OPC-UA subscription and monitored item tests — assert MonitoredItem triggers callback within sampling interval; (7) OPC-UA security tests — assert rejected connections without correct certificate or credentials; (8) OPC-UA historical data access (HistoryRead) tests; (9) OPC-UA method call tests; (10) Simulated PLC environment using Modbus Slave simulator or OPC-UA simulation server in Docker; (11) Protocol fuzzing tests — send malformed frames, assert server/device does not crash; (12) CI pipeline with simulated industrial environment. Include Docker Compose with simulator and test examples.'
      },
      {
        id: 'fota-firmware-lifecycle-testing',
        name: 'FOTA (Firmware OTA) Lifecycle Testing',
        description: 'End-to-end firmware update delivery, rollback, and integrity tests for embedded devices.',
        prompt: 'Build a Firmware Over-The-Air (FOTA) update testing framework. Include: (1) OTA package integrity tests — verify firmware package signature (ECDSA/RSA), assert tampered package rejected before installation; (2) Delta update tests — generate delta patch between v1 and v2 firmware, apply delta on device, assert full firmware matches v2 binary; (3) Staged rollout tests — deploy OTA to 5% of device fleet, assert no error spike, progressively increase rollout to 100%; (4) Rollback tests — install v2, force watchdog timeout or checksum failure, assert device automatically reverts to v1; (5) A/B partition slot tests — assert active partition switches on successful update and switches back on failure; (6) OTA connectivity resilience tests — interrupt download at 50%, resume from checkpoint, assert download completes correctly; (7) Version pinning tests — assert device cannot downgrade to older major version; (8) OTA campaign API tests — create campaign, assign devices, assert campaign status transitions (PENDING, IN_PROGRESS, COMPLETED); (9) Bandwidth and battery impact tests — measure network bytes consumed and estimated battery drain per OTA cycle; (10) Custom OTA server API tests (AWS IoT Jobs, Mender, Hawkbit); (11) Hardware-in-the-loop CI with QEMU ARM emulation; (12) Device shadow/twin sync post-update assertion. Include mock OTA server and QEMU test harness.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 16. Compliance & Regulatory Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'compliance-testing',
    name: 'Compliance & Regulatory Testing',
    description: 'Automated test suites to validate adherence to GDPR, HIPAA, PCI-DSS, SOX, and more.',
    icon: 'ClipboardCheck',
    category: 'compliance',
    collection: 'governance-risk',
    domains: [
      'Banking & Finance (SOX / DORA)', 'Healthcare (HIPAA / FDA 21 CFR Part 11)',
      'Payment Processing (PCI-DSS)', 'Insurance (Solvency II / NAIC)',
      'Government (FedRAMP / FISMA)', 'Retail & E-Commerce (CCPA / GDPR)',
      'Pharma & Life Sciences (GxP / GAMP 5)', 'Telecom (CPNI / TCPA)',
      'Financial Advisory (MiFID II / FINRA)', 'HR & Employment (EEOC / GDPR)'
    ],
    subTemplates: [
      {
        id: 'gdpr-test-suite',
        name: 'GDPR Compliance Test Suite',
        description: 'Automated tests for data subject rights, consent, and data minimization.',
        prompt: 'Build a GDPR compliance testing framework for a data-processing platform — mandatory for any company serving EU users under Regulation (EU) 2016/679. Include: (1) Right to Access (Article 15) tests — submit Subject Access Request via API, assert system returns all PII held for that user within 72-hour SLA; (2) Right to Erasure (Article 17) deletion cascade tests — submit deletion request, assert all PII removed from primary DB, backups flagged, downstream systems notified via event; (3) Consent management tests — assert opt-in consent recorded with timestamp and source, assert processing halts when consent withdrawn; (4) Data minimisation tests — assert API responses do not include non-necessary PII fields beyond stated purpose; (5) Purpose limitation tests — assert data collected for purpose A is not accessible via endpoints serving purpose B; (6) Data portability tests — assert user data export returns machine-readable JSON/CSV within standard format; (7) Cross-border transfer compliance tests — assert data at rest in EU region, assert SCCs present for transfers outside EEA; (8) Cookie consent banner tests — assert no non-essential cookies set before explicit consent, assert cookie categories honoured; (9) Breach notification workflow tests — simulate data breach event, assert GDPR 72-hour notification workflow triggered; (10) DPIA documentation test — assert high-risk processing has completed DPIA recorded in governance system; (11) Third-party processor agreement tests — assert DPA exists for each data processor integration; (12) GitHub Actions running GDPR compliance checks using OpenDataPrivacy validators. Generate 25+ tests for a SaaS platform handling EU customer PII.'
      },
      {
        id: 'hipaa-validation',
        name: 'HIPAA Compliance Validation',
        description: 'Test PHI handling, access controls, and audit logging for healthcare systems.',
        prompt: 'Create a HIPAA compliance testing framework for a healthcare data platform — required for all covered entities and business associates under 45 CFR Parts 160 and 164. Include: (1) PHI encryption-at-rest tests — assert PostgreSQL tablespace encrypted with AES-256, assert key management via AWS KMS or Azure Key Vault; (2) PHI encryption-in-transit tests — assert all HTTPS connections use TLS 1.2+, reject TLS 1.0/1.1 connections; (3) Access control matrix tests — assert role-based access restricts PHI by job function (nurse can access patient chart, billing clerk cannot); (4) Minimum necessary access tests — assert API responses return only PHI fields required for the stated workflow; (5) Audit log completeness tests — trigger PHI read/write/delete actions, assert logs capture user ID, timestamp, record accessed, action type; (6) Automatic session logoff tests — simulate idle timeout, assert session terminates and reauthentication required; (7) Data integrity hash validation tests — assert HMAC stored with PHI records, verify hash on retrieval; (8) BAA (Business Associate Agreement) workflow tests — assert third-party integrations flagged as BAs have signed BAA recorded; (9) Breach risk assessment tests — simulate accidental PHI disclosure event, assert risk assessment workflow triggered; (10) ePHI backup and recovery tests — assert PHI backups encrypted, restorable, and tested quarterly; (11) Workforce training tracking tests — assert training completion recorded for users with PHI access; (12) GitHub Actions with HIPAA automated scan using AWS Config HIPAA conformance pack assertions. Generate 25+ tests for an EHR patient portal handling ePHI.'
      },
      {
        id: 'pci-dss-scanning',
        name: 'PCI-DSS Compliance Testing',
        description: 'Automated PCI-DSS requirement validation for payment handling systems.',
        prompt: 'Build a PCI-DSS v4.0 compliance testing framework for a payment processing system — mandatory for organisations handling cardholder data under PCI SSC requirements. Include: (1) Cardholder data discovery scan tests — regex scan application logs, databases, and S3 buckets for unmasked PAN/CVV patterns (Req 3.2); (2) PAN masking tests — assert all PAN displays show max first-6/last-4 digits only, never full 16-digit PAN in any response or log; (3) Network segmentation tests — assert CDE (Cardholder Data Environment) subnets cannot be reached from non-CDE networks via security group / firewall rule validation; (4) TLS version and cipher suite tests — assert all endpoints enforce TLS 1.2+, reject weak ciphers (RC4, 3DES, export ciphers) using sslyze or testssl; (5) Password policy enforcement tests — assert minimum 12-char passwords, complexity requirements, lockout after 10 failed attempts (Req 8.3.6); (6) MFA enforcement tests — assert all CDE admin access requires MFA (Req 8.4); (7) Patch management compliance tests — assert OS and application packages have no CVSS 9+ vulnerabilities unpatched beyond 30-day SLA; (8) Intrusion detection system alert tests — simulate suspicious event (multiple failed auth attempts), assert IDS triggers and alert sent; (9) File integrity monitoring tests — modify critical config file, assert FIM detects and alerts within 60 seconds; (10) Anti-malware deployment tests — assert AV/EDR agent present and signature-updated on all CDE hosts; (11) Quarterly ASV scan validation — run authenticated Nessus/Qualys scan against CDE, assert zero high-severity vulnerabilities; (12) GitHub Actions running Checkov PCI-DSS compliance pack against IaC. Generate 25+ tests for payment card processing infrastructure.'
      },
      {
        id: 'sox-controls-testing',
        name: 'SOX IT General Controls Testing',
        description: 'Test ITGC controls for access management, change management, and IT operations.',
        prompt: 'Build a SOX IT General Controls (ITGC) testing framework for financial reporting systems — required by all SEC-registered companies under Sarbanes-Oxley Act Section 404. Include: (1) Access provisioning tests — assert new user access requests require manager approval in ticketing system, assert approved basis recorded; (2) Access de-provisioning tests — query HR termination feed, assert all system access revoked within 2 business days of HR termination date; (3) Privileged access review tests — extract privileged accounts list, assert quarterly recertification evident in access review system; (4) Segregation of duties (SoD) conflict detection tests — compare user role assignments against SoD conflict matrix, assert zero active SoD violations in in-scope systems; (5) Change management approval tests — for each production change ticket, assert approval workflow completed with authorised approver before change window; (6) Emergency access request tests — assert firefighter/break-glass access logged, time-limited, and reviewed post-use; (7) Database access log completeness tests — assert all privileged DML statements logged with user, timestamp, and SQL in audit tables; (8) Batch job output reconciliation tests — compare batch job financial output totals against control totals, assert no unreconciled differences; (9) System availability monitoring tests — assert in-scope financial systems meet 99.9% uptime SLA with evidence from monitoring; (10) Backup completion tests — assert all in-scope system backups completed successfully and backup evidence archived; (11) Patch management ITGC tests — assert patch approval workflow documented and critical patches deployed within policy windows; (12) Evidence collection automation — Python scripts querying IAM, ITSM, and audit logs to produce SOX evidence packages for auditors. Generate 25+ control tests for a financial reporting platform.'
      },
      {
        id: 'gxp-validation',
        name: 'GxP / CSV Validation (Pharma)',
        description: 'Computer System Validation for pharmaceutical and life sciences systems.',
        prompt: 'Create a GxP Computer System Validation (CSV) framework for pharmaceutical and life sciences systems — following GAMP 5 and FDA 21 CFR Part 11 requirements. Include: (1) IQ (Installation Qualification) scripts — assert software version, server specs, network config, and installed components match approved Installation Specification; (2) OQ (Operational Qualification) test protocols — assert each system function operates per design specification using documented test cases with expected results; (3) PQ (Performance Qualification) test suites — assert system performs correctly in actual production environment with real operational workflows; (4) Audit trail completeness tests — perform create/edit/delete operations, assert audit trail records who changed what, when, from what to what with reason for change; (5) 21 CFR Part 11 electronic signature tests — assert signatures require unique user ID + password, signature manifest includes printed name, date, meaning; (6) Data integrity tests (ALCOA+ principles) — Attributable, Legible, Contemporaneous, Original, Accurate, and Complete assertions per operation type; (7) Access control tests — assert system functions restricted by validated role configuration; (8) Backup and recovery validation tests — assert backup schedule, restoration test, and recovery time within approved DRP; (9) Change control tests — assert all system changes processed through validated change control workflow with risk assessment and revalidation impact assessment; (10) URS (User Requirements Specification) traceability matrix generation — map each user requirement to IQ/OQ/PQ test case evidence; (11) Periodic review protocol template — scheduled re-execution of key OQ/PQ tests to confirm continued validation state; (12) GitHub Actions generating validation evidence report package as PDF artifact. Generate 25+ validation test cases for an electronic batch record (eBR) system.'
      },
      {
        id: 'dora-compliance',
        name: 'DORA (Digital Operational Resilience Act)',
        description: 'ICT risk tests, RTO/RPO thresholds, third-party resilience, and TLPT readiness.',
        prompt: 'Build a DORA (Digital Operational Resilience Act — EU Regulation 2022/2554) compliance testing framework for financial entities — mandatory for EU banks, insurers, and investment firms from January 2025. Include: (1) ICT risk management tests — assert each critical ICT system has completed risk assessment with DORA Article 6 required elements (identification, classification, RTO/RPO targets, dependency map); (2) RTO/RPO threshold validation tests — execute failover drills, assert critical systems recover within DORA-required RTO targets, assert data loss within RPO; (3) ICT third-party provider register tests — assert register maintained per Article 28 with provider name, service, criticality classification, contractual provisions; (4) Third-party provider resilience tests — simulate provider outage, assert fallback or exit strategy activates, assert SLA breach detection triggers escalation; (5) Incident classification tests — inject simulated ICT incident, assert classification against DORA major incident criteria (user impact, downtime duration, data loss); (6) Major incident reporting workflow tests — classify incident as major, assert notification workflow generates EBA/ECB-compliant initial report within 4 hours; (7) TLPT (Threat-Led Penetration Testing) readiness tests — assert testing scope defined, crown jewels identified, test plan approved by board-level sponsor; (8) Digital operational resilience strategy evidence tests — assert board-approved DOR strategy documented with annual review date; (9) Concentration risk tests — assert cloud provider spend concentration measured, threshold breach triggers escalation; (10) Information sharing tests — assert cyber threat intelligence shared to DORA-compliant sector ISAC per Article 45; (11) ICT change management tests — assert all ICT changes assessed for operational resilience impact; (12) GitHub Actions generating DORA Article 25 self-assessment evidence package. Generate 25+ compliance tests for a regulated financial platform.'
      },
      {
        id: 'iso27001-soc2',
        name: 'ISO 27001 / SOC 2 Controls Testing',
        description: 'Access control, availability, and change management controls evidence collection.',
        prompt: 'Create an ISO 27001 and SOC 2 Type II controls testing framework for a SaaS company — the most common information security certifications required by enterprise buyers. Include: (1) Logical access control tests (CC6 / ISO Annex A 9) — assert MFA enforced for all production access, assert access provisioned only by approved request, assert quarterly access review completed; (2) Least-privilege tests — query IAM role policies, assert no wildcard (*) permissions in production roles, assert engineers cannot directly access prod data without break-glass workflow; (3) Availability control tests (A1 / ISO Annex A 17) — backup restoration drill, uptime SLA measurement against 99.9%, RTO and RPO proof from last tested DR drill; (4) Change management tests (CC8 / ISO Annex A 12.1) — assert production changes processed through approved ITSM workflow with peer review and CAB approval for major changes; (5) Incident response tests — simulate security event, assert incident ticket created within defined detection-to-response SLA, assert severity classification applied; (6) Encryption controls tests (ISO Annex A 10) — assert data at rest encrypted AES-256, in transit TLS 1.2+, key rotation schedule enforced; (7) Vendor risk management tests (ISO Annex A 15) — assert vendor register maintained, all critical vendors have completed security questionnaire; (8) Physical security evidence tests (ISO Annex A 11) — assert data centre provider SOC 2 certifications on file; (9) Security awareness training tests — assert 100% of staff completed annual security training with completion record; (10) Vulnerability management tests — assert CVSS Critical vulnerabilities remediated within 7 days, High within 30 days, evidence in tracking system; (11) Automated evidence collection scripts mapping test results to ISO Annex A controls and AICPA Trust Service Criteria; (12) GitHub Actions generating SOC 2 readiness evidence package as artifacts. Generate 25+ control tests for a cloud-hosted B2B SaaS platform.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 17. Blockchain & Smart Contract Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'blockchain-testing',
    name: 'Blockchain & Smart Contract Testing',
    description: 'Test smart contracts, DeFi protocols, NFT logic, and blockchain integrations.',
    icon: 'Link2',
    category: 'blockchain',
    collection: 'specialized-systems',
    domains: [
      'DeFi - DEX & Lending Protocols', 'NFT & Gaming (Play-to-Earn)',
      'Supply Chain Provenance', 'Healthcare Records & Identity',
      'Digital Identity & Verifiable Credentials', 'Central Bank Digital Currency (CBDC)',
      'Real Estate Tokenization', 'Insurance Smart Contracts (Parametric)',
      'Carbon Credits & ESG', 'Cross-Chain Bridges'
    ],
    subTemplates: [
      {
        id: 'hardhat-solidity',
        name: 'Hardhat (Solidity / EVM)',
        description: 'Feature-rich Ethereum development and testing framework.',
        prompt: 'Build a Solidity smart contract testing framework using Hardhat, ethers.js v6, and Chai — the standard used by DeFi teams at Uniswap, Aave, and Compound. Include: (1) Hardhat project setup with hardhat.config.ts: networks, solidity compiler version, hardhat-toolbox plugins (Chai matchers, ethers, coverage); (2) Unit tests for all contract functions using loadFixture for efficient state snapshots and test isolation; (3) Event emission assertions using chai matchers: expect(tx).to.emit(contract, "Transfer").withArgs(from, to, amount); (4) Access control and role tests — assert onlyOwner functions revert with OwnableUnauthorizedAccount when called by non-owner; (5) Reentrancy attack simulation — deploy malicious ReentrancyAttack contract, call withdraw, assert attack fails due to CEI pattern or OpenZeppelin ReentrancyGuard; (6) Integer overflow/underflow edge case tests — assert SafeMath or Solidity 0.8+ overflow reverts on boundary values; (7) Gas usage benchmarks using hardhat-gas-reporter generating per-function gas table; (8) Fork testing against Ethereum mainnet state using hardhat forking: impersonate whale accounts, test DeFi protocol interactions; (9) Upgradeable proxy tests using OpenZeppelin Upgrade Plugins — deploy proxy, upgrade to V2, assert storage layout preserved; (10) time manipulation using time.increaseTo() for testing time-locked functions (vesting, timelocks); (11) Full branch coverage using solidity-coverage reporting uncovered paths; (12) GitHub Actions running npx hardhat test with coverage. Generate 25+ tests for an ERC-20 token, staking contract, and governance system.'
      },
      {
        id: 'foundry-testing',
        name: 'Foundry (Forge)',
        description: 'Blazing fast Solidity testing with fuzzing and invariant testing built-in.',
        prompt: 'Build a Solidity smart contract testing framework using Foundry (Forge) — the fastest Solidity testing tool used by Paradigm, a16z crypto portfolio companies, and leading DeFi protocols. Include: (1) Forge test structure: test/unit/, test/integration/, test/invariant/ directories with consistent BaseTest.sol setUp() pattern; (2) Fuzz tests using foundry\'s built-in fuzzer: function testFuzz_Transfer(address to, uint256 amount) with assume() guards and runs=10000 in foundry.toml; (3) Stateful invariant tests: InvariantTest.sol with targetContract(), invariant_totalSupplyMatchesBalances() asserting protocol-wide invariants hold across 10000 random action sequences; (4) Cheatcodes: vm.prank(address) for impersonation, vm.warp(timestamp) for time travel, vm.deal(address, amount) for ETH balance setup, vm.expectEmit / vm.expectRevert; (5) Fork tests: vm.createFork("mainnet") to test against live deployed contracts (Uniswap V3, Chainlink oracles); (6) Snapshot comparisons: forge snapshot generating gas snapshot file tracked in git for gas regression detection; (7) Slither static analysis integration: slither . --checklist generating checklist.md with identified vulnerability patterns; (8) Differential testing: compare Solidity implementation against reference implementation for mathematical functions; (9) Echidna property fuzzer integration for complex invariant discovery beyond Forge; (10) Test coverage: forge coverage generating LCOV report uploaded to Codecov; (11) Script-based deployment tests: forge script with broadcast dry-run assertions; (12) GitHub Actions running forge test --fork-url $MAINNET_RPC_URL. Generate 25+ tests for a DeFi vault, lending pool, or NFT marketplace.'
      },
      {
        id: 'anchor-solana',
        name: 'Anchor (Solana)',
        description: 'Testing framework for Solana programs using the Anchor IDL framework.',
        prompt: 'Build a Solana program testing framework using Anchor and Jest/Mocha — the standard toolchain for Solana development teams at Metaplex, Raydium, and Solana Labs ecosystem projects. Include: (1) Anchor workspace structure: programs/, tests/, app/ with Anchor.toml defining cluster (localnet for CI, devnet for integration); (2) Program unit tests using @coral-xyz/anchor provider with Keypair-based signer fixtures for each test; (3) Instruction handler tests — build and send transactions via anchor.methods.myInstruction().accounts({...}).rpc(), assert on-chain account state updated correctly; (4) Account constraint validation tests — send instruction violating has_one, constraint, or seeds constraints, assert AnchorError with expected error code; (5) PDA (Program Derived Address) derivation correctness tests — derive PDA using findProgramAddressSync, assert matches on-chain account address; (6) CPI (Cross-Program Invocation) tests — test program that calls SPL Token program, assert token mint/transfer state changes; (7) SPL Token interaction tests — create mint, create associated token account, mint tokens, assert balance; (8) bankrun fast program simulation tests using solana-bankrun for unit tests without network overhead; (9) Error code tests — assert each custom error code from errors enum triggers correctly on invalid input; (10) localnet validator setup with anchor test deploying program to test-validator; (11) Fuzz testing using trdelnik-fuzz for instruction parameter fuzzing; (12) GitHub Actions with Solana test validator CLI. Generate 25+ tests for a token staking or NFT minting program.'
      },
      {
        id: 'smart-contract-security',
        name: 'Smart Contract Security Auditing',
        description: 'Automated vulnerability scanning for Solidity contracts.',
        prompt: 'Build a smart contract security testing pipeline — the standard security review process used by top audit firms Trail of Bits, ConsenSys Diligence, and OpenZeppelin. Include: (1) Slither static analysis: slither . --checklist with detector filters for reentrancy, unprotected-upgrade, arbitrary-send-eth, controlled-delegatecall, and tautology detectors; (2) Mythril symbolic execution: myth analyze contracts/MyContract.sol --solv 0.8.20 for deeper vulnerability discovery beyond static analysis; (3) Echidna fuzzer: configure echidna.yaml with testLimit 50000, define Echidna properties (invariant functions) for critical protocol invariants; (4) Custom invariant checks via Foundry invariant tests for DeFi-specific invariants (total assets >= total liabilities, no free minting); (5) OpenZeppelin Defender Advisor checks for upgrade safety, storage layout compatibility, and proxy selector clashes; (6) Access control audit tests — enumerate all privileged functions, assert each has correct modifier (onlyOwner, onlyRole), write tests confirming non-privileged users are rejected; (7) Flash loan attack simulation — fork mainnet, execute flash loan to manipulate oracle/price, assert protocol is not exploitable; (8) Integer and precision tests — fuzz arithmetic functions with boundary inputs (type(uint256).max, 0, 1), assert no unexplained precision loss; (9) SARIF output generation for GitHub Advanced Security tab integration; (10) solhint linting with security-focused rules enforced as CI gate; (11) Automated audit report template generation summarising findings by severity; (12) GitHub Actions security scan pipeline on every PR. Generate 20+ security tests for a DeFi protocol vault and governance contract.'
      },
      {
        id: 'vyper-testing',
        name: 'Vyper Smart Contract Testing',
        description: 'Titanoboa and pytest for Vyper contracts with storage introspection.',
        prompt: 'Build a Vyper smart contract testing framework using Titanoboa and pytest. Include unit tests for Vyper contract functions with direct EVM execution, storage slot introspection for state validation, internal function access with boa.env context, fuzzing with Hypothesis for stateful property tests, gas consumption benchmarks per function, multi-contract interaction tests using boa.env.deploy, and a CI pipeline with Vyper version pinning and coverage report generation.'
      },
      {
        id: 'crosschain-bridge-testing',
        name: 'Cross-Chain Bridge Security Testing',
        description: 'Invariant testing for lock-and-mint, replay attack prevention, and Foundry fork tests.',
        prompt: 'Create a cross-chain bridge security testing framework using Foundry. Include invariant tests for lock-and-mint balance conservation (total locked on source equals total minted on destination), replay attack prevention tests (nonce and chain ID checks), signature validation fuzzing with arbitrary signer addresses, Foundry fork tests simulating bridge exploits from mainnet state, emergency pause mechanism tests, relayer permissioning assertion tests, and a Forge snapshot comparison for gas regression across bridge operations.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 18. Desktop Application Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'desktop-testing',
    name: 'Desktop Application Testing',
    description: 'UI automation and functional testing for Windows, macOS, and Linux desktop apps.',
    icon: 'Monitor',
    category: 'desktop',
    collection: 'product-experience',
    domains: [
      'Finance & Trading Terminals', 'Healthcare Clinical Workstations',
      'ERP & CRM Applications', 'CAD & Engineering Design Tools',
      'Document Management Systems', 'Scientific & Lab Software',
      'Media Production & Editing', 'Insurance Policy Management',
      'Government Point-of-Service', 'Retail POS & Inventory'
    ],
    subTemplates: [
      {
        id: 'winappdriver',
        name: 'WinAppDriver (Windows Desktop)',
        description: 'Selenium WebDriver-compatible automation for Windows desktop apps.',
        prompt: 'Build a Windows desktop application testing framework using WinAppDriver and C# / NUnit — used by enterprise QA teams testing ERP terminals, trading workstations, and insurance desktop apps. Include: (1) WinAppDriver capability setup: AppiumOptions with app path, platformName=Windows, deviceName=WindowsPC; (2) Page Object Model: screen classes encapsulating Windows UI Automation element locators (AutomationId, Name, ClassName, XPath); (3) Inspect.exe and Accessibility Insights identification of AutomationId for reliable element targeting; (4) Keyboard and clipboard action tests — type text via SendKeys, assert clipboard content via Ctrl+C/Paste; (5) Menu navigation tests — click File menu, navigate sub-menus, assert expected dialog opens; (6) Data grid interaction tests — WinForms DataGridView row selection, cell editing, column sorting assertions; (7) Dialog handling tests — assert modal dialogs, file-open/save dialogs, messageboxes accept expected interactions; (8) Multi-window session tests — handle multiple top-level windows, switch context between application windows; (9) Screenshot capture on failure using NUnit TestContext.AddTestAttachment; (10) Test retry policy for flaky UI interactions using NUnit Retry attribute; (11) Test data isolation using NUnit SetUp cleaning application state before each test; (12) Azure DevOps pipeline with Windows-hosted agent running WinAppDriver tests. Generate 20+ tests for a financial trading terminal or insurance policy management application.'
      },
      {
        id: 'electron-testing',
        name: 'Electron App Testing (Playwright)',
        description: 'E2E testing for Electron desktop applications using Playwright.',
        prompt: "Build an Electron application testing framework using Playwright's Electron API — used by teams building VS Code extensions, Slack-like apps, and cross-platform desktop tools. Include: (1) Playwright Electron launch fixture: _electron.launch({ args: ['.'] }) creating ElectronApp with electronApp.firstWindow() page handle; (2) Main process testing via electronApp.evaluate() calling Node.js APIs (fs.readFileSync, path.resolve, ipcMain handlers); (3) Renderer process UI testing using Playwright page API — click, fill, expect, screenshot in Chromium-rendered window; (4) IPC communication tests — page.evaluate(() => ipcRenderer.invoke('get-settings')) assert expected result returned from main process handler; (5) System dialog mocking — override dialog.showOpenDialog in main process test mock, assert correct paths returned to renderer; (6) Native menu automation — electronApp.evaluate(({ Menu }) => Menu.getApplicationMenu().getMenuItemById('save').click()) assertions; (7) File system interaction tests — write temp file, open in app, assert content rendered in editor; (8) Auto-update workflow tests — mock autoUpdater events, assert update-downloaded triggers UI notification; (9) windowBounds, zoomLevel, and fullscreen state assertions; (10) Cross-platform test matrix: Windows and macOS runners in GitHub Actions matrix; (11) Accessibility tests on Electron renderer windows using axe-playwright; (12) GitHub Actions workflow uploading screenshots as artifacts on failure. Generate 20+ tests for a code editor or productivity desktop application."
      },
      {
        id: 'pyautogui-desktop',
        name: 'PyAutoGUI / Pywinauto (Python)',
        description: 'Screen-based and accessible UI automation for legacy desktop apps.',
        prompt: 'Build a Python-based desktop testing framework using Pywinauto and PyAutoGUI — the approach used by QA teams testing legacy Win32, WPF, and MFC enterprise desktop applications. Include: (1) Pywinauto Application.connect(path=...) and Application.start(cmd_line=...) for Win32 and WPF app attachment; (2) window.child_window(title=..., control_type=...) accessible element identification using Inspect.exe-mapped properties; (3) Keyboard shortcut automation tests using keyboard module — Alt+F4, Ctrl+S, Tab navigation sequences with assertion on resulting UI state; (4) WPF UI element interaction tests using pywinauto UIA backend with proper control_type selectors; (5) MFC/Win32 dialog tests using Pywinauto win32 backend; (6) PyAutoGUI screenshot-based fallback tests for non-accessible controls: pyautogui.locateOnScreen() for button images; (7) Drag-and-drop workflow tests using Pywinauto drag_mouse_input for reorder operations; (8) Menu navigation tests via menu_select("File->Save As") helper with assertion on resulting dialog; (9) Multi-monitor support tests asserting window positioning on different monitor configurations; (10) Pixel-based visual assertion using Pillow screenshot comparison with configurable threshold; (11) Test cleanup using app.kill() in pytest teardown fixtures; (12) GitHub Actions with Windows-hosted runner and virtual display if headless needed. Generate 20+ tests for a legacy financial reporting or document management desktop application.'
      },
      {
        id: 'tauri-qt-testing',
        name: 'Tauri / Qt App Testing',
        description: 'Testing framework for modern Tauri (Rust/Web) and Qt desktop applications.',
        prompt: 'Build a testing framework for Tauri and Qt desktop applications — the modern cross-platform stacks used by Bitwarden (Tauri), Autodesk (Qt), and VirtualBox (Qt). Include: (1) Tauri WebdriverIO integration: configure Tauri app for WebDriver, use @wdio/tauri-service to connect, test web-layer UI (button clicks, form fills, navigation) like a normal browser; (2) Tauri backend command tests using Rust unit tests — #[cfg(test)] modules testing tauri::command functions with mock app state; (3) Tauri IPC command fuzzing: drive frontend to invoke commands with boundary values, assert Rust handlers return correct error types; (4) Tauri plugin tests — tauri-plugin-store, tauri-plugin-fs, tauri-plugin-notification integration tests; (5) Qt Test framework C++ unit tests using QTest: QCOMPARE, QVERIFY, QTRY_COMPARE for async state; (6) Qt widget interaction tests using QTest::mouseClick, QTest::keyClick on QWidget instances; (7) Qt QML component tests using QQuickTest and TestCase QML type for modern Qt Quick apps; (8) Cross-platform screenshot comparison using Playwright (Tauri) or Qt screenshot tests with pixel-diff validation on Windows/macOS/Linux; (9) Tauri bundler and updater E2E tests — assert .msi/.dmg/.AppImage build artifacts produced correctly; (10) CI pipeline with tauri-action GitHub Action building cross-platform installers; (11) QML lint with qmllint and Clang-Tidy for C++ code quality gates; (12) GitHub Actions matrix: Windows, macOS, Ubuntu runners for Tauri and Qt tests. Generate 20+ tests for a Tauri password manager or Qt CAD settings panel.'
      },
      {
        id: 'macos-xcuitest',
        name: 'macOS Accessibility / XCUITest',
        description: 'macOS XCUITest, Accessibility Inspector, keyboard shortcuts, and Dark Mode checks.',
        prompt: 'Build a macOS desktop application testing framework using XCUITest and Swift. Include XCUIApplication launch and UI element traversal, accessibility label and value assertions using Accessibility Inspector-discovered identifiers, keyboard shortcut end-to-end tests (Cmd+key combinations), Dark Mode and High Contrast appearance switching tests, menu bar and Dock integration tests, full-screen mode and window resizing assertions, and Xcode Cloud CI integration with parallel device matrix.'
      },
      {
        id: 'atspy-linux',
        name: 'Linux Desktop Testing (AT-SPI / dogtail)',
        description: 'AT-SPI2 automation for GTK and Qt Linux applications using dogtail or ldtp.',
        prompt: 'Create a Linux desktop application testing framework using AT-SPI2, dogtail, and LDTP. Include application launch via Wnck/dogtail findApp, widget interaction tests for GTK buttons, menus, dialogs, and tree views, Qt accessibility bridge tests using qt-at-spi, keyboard navigation sequence tests, clipboard operation tests, file dialog automation, Wayland-compatible testing setup using xdg-desktop-portal, and headless CI setup using Xvfb with screenshot capture on failure.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 19. Event-Driven & Messaging Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'event-driven-testing',
    name: 'Event-Driven & Messaging Testing',
    description: 'Test Kafka, RabbitMQ, SQS, EventBridge, and event-sourced distributed systems.',
    icon: 'MessageSquare',
    category: 'events',
    collection: 'specialized-systems',
    domains: [
      'E-Commerce Order Events', 'Banking & Payment Transactions',
      'Telecom Network Events', 'IoT Device Telemetry',
      'Healthcare HL7 / FHIR Events', 'Logistics & Shipment Tracking',
      'Real-Time Analytics Pipelines', 'Gaming & Leaderboard Events',
      'Social Media Activity Streams', 'Supply Chain & Inventory Events'
    ],
    subTemplates: [
      {
        id: 'kafka-testing',
        name: 'Kafka Testing (Testcontainers)',
        description: 'Integration testing for Apache Kafka producers, consumers, and streams.',
        prompt: 'Build a Kafka integration testing framework using Testcontainers-Kafka and pytest — the standard approach used by data engineering teams at Uber, LinkedIn, and Confluent. Include: (1) Testcontainers KafkaContainer session fixture: start Kafka, create AdminClient, create test topics with desired partition count and replication; (2) Producer integration tests — produce N messages, assert all messages land in topic (consume until timeout), assert schemas, keys, and partition assignments; (3) Consumer group offset management tests — produce messages, consume and commit, restart consumer, assert no re-delivery and offsets persisted; (4) Exactly-once semantics tests using transactional producer — begin transaction, produce, commit; assert consumer with isolation.level=read_committed only reads committed messages; (5) Kafka Streams topology tests using TopologyTestDriver — pipe input records, advance wall-clock time, assert output records in output topic; (6) Schema Registry Avro contract tests — serialise message with AvroSerializer, assert deserialisable by consumer schema, assert incompatible schema evolution rejected; (7) Consumer lag monitoring assertions — produce faster than consumer, measure consumer lag via AdminClient.list_consumer_group_offsets(), assert lag recovers after slowdown; (8) Kafka transaction abort tests — start transaction, abort, assert aborted messages invisible to read_committed consumers; (9) Compacted topic tests — produce multiple values for same key, run compaction, assert only latest value retained; (10) Kafka Connect JDBC Source connector tests with Testcontainers Postgres; (11) Performance throughput tests asserting producer throughput meets SLA; (12) GitHub Actions with Docker-in-Docker for Testcontainers. Generate 25+ tests for an order events or payment transaction Kafka pipeline.'
      },
      {
        id: 'rabbitmq-testing',
        name: 'RabbitMQ Testing',
        description: 'Test AMQP exchanges, queues, routing, and dead-letter behavior.',
        prompt: 'Build a RabbitMQ testing framework using Python (pika), pytest, and Testcontainers RabbitMQ — used by teams at VMware, Zalando, and financial services firms. Include: (1) Testcontainers RabbitMQ fixture: start RabbitMQ container, create BlockingConnection, declare test exchange and queue; (2) Exchange type tests: direct exchange routing by routing key, fanout broadcast to all bound queues, topic exchange pattern matching (*.error, orders.#); (3) Message durability and persistence tests — declare durable queue, publish persistent message, restart RabbitMQ container, assert message survives restart; (4) Dead-letter queue (DLQ) behavior tests — set x-dead-letter-exchange on queue, reject message (basic_nack), assert re-routed to DLX queue; (5) Message TTL and queue TTL expiry tests — set x-message-ttl, publish message, wait TTL+10ms, assert message expired and not consumable; (6) Priority queue ordering tests — set x-max-priority, publish messages with priority 1-10, consume, assert delivered in priority descending order; (7) Consumer acknowledgement and reject tests — assert ack removes message from queue, nack with requeue=True returns message, nack with requeue=False routes to DLQ; (8) Poison message handling via x-death header tracking and DLQ inspection; (9) Shovel plugin and federation tests for multi-broker scenarios; (10) RabbitMQ Management API tests using requests library — assert queue depth, connection count, channel rate via HTTP API; (11) Publisher confirms tests asserting message durability guarantees; (12) GitHub Actions with RabbitMQ Docker container. Generate 25+ tests for order processing and notification queuing scenarios.'
      },
      {
        id: 'aws-sqs-sns-testing',
        name: 'AWS SQS / SNS / EventBridge Testing',
        description: 'Test AWS messaging services with LocalStack and moto.',
        prompt: 'Build an AWS event messaging testing framework using LocalStack and moto — the approach used by cloud-native teams at Amazon, Airbnb, and Netflix running serverless event architectures. Include: (1) LocalStack pytest fixture: start LocalStack container with SQS, SNS, EventBridge, Lambda services enabled; (2) SQS Standard queue tests — create queue, send message with attributes, receive and assert message body, receipt handle, MessageAttributes; (3) SQS FIFO queue ordering tests — send 10 messages with same MessageGroupId, receive all, assert FIFO order preserved; (4) SNS fan-out tests — create SNS topic, subscribe 3 SQS queues, publish message, assert all 3 queues receive delivery; (5) SNS message filtering tests — set FilterPolicy on subscription, publish messages with and without matching attributes, assert only matching messages delivered; (6) EventBridge rule pattern matching tests — create EventBus, put Events, assert only events matching rule pattern trigger target; (7) Lambda event source mapping tests — create SQS trigger on Lambda, put message in SQS, assert Lambda invoked and processed (via CloudWatch Logs or DynamoDB side effect); (8) SQS DLQ and redrive policy tests — set maxReceiveCount=2, fail message processing twice, assert message moved to DLQ; (9) Message attribute filtering tests — assert SQS message attributes preserved end-to-end; (10) moto mock library tests for pure unit testing without LocalStack; (11) SNS SMS and email subscription mock tests; (12) GitHub Actions with Docker-in-Docker for LocalStack container. Generate 25+ tests for an e-commerce order event and notification architecture.'
      },
      {
        id: 'event-sourcing-cqrs',
        name: 'Event Sourcing & CQRS Testing',
        description: 'Test event store aggregates, projections, and sagas.',
        prompt: 'Build a testing framework for an event-sourced CQRS system using EventStoreDB or Axon Framework — the architecture used by teams at bol.com, ING Bank, and enterprise DDD-practitioner companies. Include: (1) Aggregate unit tests using given/when/then fixtures: given list of past events, when command applied, then assert emitted events match expected; (2) Aggregate state reconstruction tests — replay event stream, assert aggregate state computed from events matches expected current state; (3) Event versioning and upcasting tests — replay old event schema, assert upcaster converts to new schema transparently; (4) Projection rebuild correctness tests — replay full event stream through projection, assert read model matches expected snapshot; (5) Saga/Process Manager tests — inject trigger event, assert saga issues expected compensating commands; inject failure event, assert saga compensation flow executes; (6) Temporal event ordering tests — submit concurrent commands, assert event stream causally consistent; (7) Snapshot creation and restoration tests — force snapshot after N events, assert aggregate restored from snapshot with correct state; (8) EventStoreDB stream subscription tests — subscribe to stream with catch-up subscription, replay historical events, assert all received; (9) Read model consistency tests — send command, poll read model until eventually consistent, assert within SLA; (10) Idempotency tests — replay same command twice, assert only one event emitted; (11) EventStoreDB Testcontainers fixture for isolated integration tests; (12) GitHub Actions running aggregate unit tests and projection integration tests. Generate 25+ tests for an order management or banking transaction event-sourced system.'
      },
      {
        id: 'azure-servicebus-testing',
        name: 'Azure Event Hub / Service Bus Testing',
        description: 'Consumer group offsets, dead-letter queues, and message session affinity testing.',
        prompt: 'Build an Azure messaging testing framework for Event Hub and Service Bus. Include Event Hub consumer group checkpoint validation, partition offset lag measurement, Service Bus dead-letter queue inspection and reprocess tests, message session affinity and lock renewal tests, topic subscription filter rule validation, large message batching edge cases, Service Bus Emulator Testcontainer for local dev, and Azure Monitor metrics assertions for throttling and quota thresholds.'
      },
      {
        id: 'redis-streams',
        name: 'Redis Streams & Pub/Sub Testing',
        description: 'Consumer group lag, XREAD blocking, XACK integrity, and pub/sub delivery testing.',
        prompt: 'Create a Redis Streams and Pub/Sub testing framework using ioredis or redis-py. Include consumer group creation and lag measurement tests, XREAD blocking call timeout and batch size assertions, XACK message acknowledgement integrity checks, pending entry list (PEL) recovery after consumer crash, pub/sub channel subscription and message delivery ordering tests, keyspace notification tests, Redis Cluster partition tolerance tests, and Testcontainers Redis fixture for isolated test environments.'
      },
      {
        id: 'nats-pulsar',
        name: 'NATS / Apache Pulsar Testing',
        description: 'NATS JetStream durability, Pulsar subscription types, and schema enforcement tests.',
        prompt: 'Build a NATS and Apache Pulsar testing framework. Include NATS JetStream stream persistence and replay tests, consumer durable subscription delivery guarantee tests, NATS KV and Object Store CRUD assertions, Pulsar subscription type tests (exclusive, shared, failover, key_shared), Pulsar schema registry enforcement tests (Avro/JSON), topic compaction and retention policy tests, NATS server clustering failover scenarios, and Docker Compose test environment with embedded NATS Server and Pulsar standalone.'
      },
      {
        id: 'google-pubsub-testing',
        name: 'Google Cloud Pub/Sub Testing',
        description: 'Publish, subscribe, dead-letter, ordering, and exactly-once delivery tests for GCP Pub/Sub.',
        prompt: 'Build a Google Cloud Pub/Sub testing framework using the google-cloud-pubsub Python client and pytest. Include: (1) Topic and subscription creation/deletion tests via Publisher and Subscriber clients; (2) Publish and synchronous pull tests — publish N messages, pull with max_messages, assert all received and acknowledged; (3) Push subscription tests — configure push endpoint (local Flask server in test), publish message, assert subscription delivers to endpoint within SLA; (4) Message ordering key tests — publish ordered messages with same ordering key, assert received in publish order; (5) Exactly-once delivery tests — configure subscription with exactly_once_delivery, assert no duplicate messages on redelivery; (6) Dead-letter topic tests — force max delivery attempts, assert message routed to DLQ topic; (7) Message filtering tests — publish messages with attributes, configure subscription filter, assert only filtered messages delivered; (8) Pub/Sub Lite tests for high-throughput, low-cost scenarios; (9) BigQuery subscription tests — publish messages, assert BigQuery table receives rows via managed subscription; (10) Pub/Sub emulator as pytest fixture for local testing; (11) GitHub Actions with Pub/Sub emulator container. Include conftest.py with emulator fixture and message factory.'
      },
      {
        id: 'confluent-cloud-kafka-testing',
        name: 'Confluent Cloud — Schema Registry & Topics Testing',
        description: 'Avro/Protobuf schema evolution, topic configuration, and Confluent Platform connector tests.',
        prompt: 'Build a Confluent Cloud testing framework using confluent-kafka-python and pytest. Include: (1) Schema Registry tests — register Avro and Protobuf schemas, assert schema ID returned, test backward and forward compatibility checks, assert incompatible schema registration rejected; (2) Schema evolution tests — deploy schema v1, evolve to v2 with backward-compatible change, assert v1 consumers can still deserialize v2 messages; (3) Topic configuration validation tests — assert topic replication factor, min.insync.replicas, retention.ms, cleanup.policy match organizational standards; (4) Producer tests with Avro serialisation — serialize message with AvroSerializer, assert message in topic deserializable by consumer; (5) Consumer group tests — assert consumer group rebalance completes within timeout, all partitions assigned; (6) KSQL / ksqlDB stream processing tests — create stream or table, insert test records, query and assert results; (7) Kafka Connect connector tests — deploy connector configuration, assert it becomes RUNNING, verify data flows to/from target; (8) Topic partition scaling tests; (9) Client quota tests — assert producer throttled beyond configured throughput limit; (10) Testcontainers Kafka (Redpanda or Confluent) for CI isolation; (11) GitHub Actions with Confluent Cloud test cluster. Include producer/consumer fixture and SodaCL data quality checks.'
      },
      {
        id: 'kafka-connect-smt-testing',
        name: 'Kafka Connect SMT & Connector Testing',
        description: 'Single Message Transform unit tests, Source/Sink connector integration, and schema mapping tests.',
        prompt: 'Build a Kafka Connect Single Message Transform (SMT) and connector testing framework. Include: (1) SMT unit tests in Java using ConnectRecordAssert — test custom SMT transformations with sourceRecord input and expected output assertion (field renaming, header injection, value masking, topic routing); (2) Built-in SMT tests — ReplaceField, MaskField, ExtractField, TimestampConverter, InsertField with known input/output pairs; (3) SMT chaining tests — assert ordered chain of transforms produces expected final record; (4) Source Connector integration tests using Testcontainers — start source system (Postgres/MySQL), configure connector, assert records appear on Kafka topic with correct schema; (5) Sink Connector integration tests — publish test records to topic, configure sink connector, assert records land in target system (Elasticsearch, S3, BigQuery); (6) Schema mapping tests — assert source schema correctly mapped to Kafka schema, field type conversions accurate; (7) Error handler tests — publish undeserializable record, assert dead letter queue receives errored record with error headers; (8) Connector restart recovery tests — stop connector, publish messages, restart, assert no gap in consumption; (9) Connector offset management tests — reset offsets, verify connector replays from expected position; (10) Connector quota and throughput tests; (11) Docker Compose environment with Kafka Connect worker; (12) GitHub Actions CI pipeline. Include Java SMT test utilities and connector config JSONs.'
      }
    ]
  },

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 20. Visual Regression Testing
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: 'visual-regression-testing',
    name: 'Visual Regression Testing',
    description: 'Catch unintended UI changes with pixel-perfect and AI-powered visual comparisons.',
    icon: 'Eye',
    category: 'visual',
    collection: 'product-experience',
    domains: [
      'E-Commerce Product Pages', 'SaaS Dashboards & Analytics', 'Media & Publishing',
      'Banking & Financial UIs', 'Government Portals', 'Design Systems & Component Libraries',
      'Healthcare Patient Portals', 'Insurance Self-Service Portals',
      'Education Platforms', 'Marketing & Landing Pages'
    ],
    subTemplates: [
      {
        id: 'percy-playwright',
        name: 'Percy + Playwright',
        description: 'Cloud-based visual review workflow for Playwright tests.',
        prompt: 'Build a visual regression testing framework using Percy and Playwright — the cloud visual review platform used by GitHub, Shopify, and Canva. Include: (1) Percy SDK setup: @percy/playwright installed, PERCY_TOKEN in env, percySnapshot(page, "Page name") calls integrated into existing Playwright E2E tests; (2) Per-page visual snapshots: critical pages (homepage, product page, checkout, dashboard, error pages) each captured as named Percy snapshot; (3) Component-level snapshots: navigate to Storybook stories or component isolation routes, snapshot each component state; (4) Responsive viewport snapshots: widths array [375, 768, 1280, 1920] per snapshot asserting layout at all breakpoints; (5) Dynamic content masking: percyCSS hiding timestamps, user-generated content, ads, and date fields using .percy-hide CSS class; (6) Authentication flow snapshots: logged-in vs logged-out pages comparing visual baseline; (7) Dark mode and light mode parallel snapshot comparison using separate snapshot names; (8) Percy Build API integration: POST to Percy API on build complete, assert build status=approved in CI; (9) Branch-based visual review: PR comments automatically show Percy diff link with before/after for reviewer approval; (10) Baseline management: maintain approved baselines per release branch, auto-accept snapshots matching baseline pixel-for-pixel; (11) Percy GitHub Actions integration with percy exec -- playwright test command; (12) Slack notification on Percy build with unapproved visual diffs blocking merge. Generate 20+ snapshot tests for an e-commerce or SaaS product covering all critical pages and responsive breakpoints.'
      },
      {
        id: 'backstopjs',
        name: 'BackstopJS',
        description: 'Self-hosted visual regression testing with Docker consistency.',
        prompt: 'Build a visual regression framework using BackstopJS — the self-hosted visual testing tool used by Drupal, WordPress agencies, and teams needing zero external dependency visual testing. Include: (1) backstop.json configuration: id, viewports array (mobile 375x667, tablet 768x1024, desktop 1280x900), scenarios array with label, url, selectors, hideSelectors, removeSelectors; (2) Scenario coverage: all critical UI routes (home, category, product, cart, checkout, account, error 404) each with dedicated scenario entry; (3) Dynamic content hiding via hideSelectors for timestamps, carousels, live chat widgets, banners that change between runs; (4) referenceSelector for scoped diff to specific DOM elements instead of full page; (5) clickSelector and hoverSelector for testing interactive states (dropdown open, hover card, tooltip visible); (6) readyEvent or readySelector for waiting for async content to load before snapshot; (7) Docker-based consistent rendering: backstop remote option with Chromium via Docker ensuring identical renders across developer machines and CI; (8) HTML diff report: backstop test generates report/index.html with side-by-side before/after and pixel diff overlay; (9) Approval workflow: backstop approve updating reference screenshots after intentional UI changes; (10) Engine configuration: puppeteer engine with chromeFlags for headless and GPU disable; (11) GitHub Actions with Docker Compose running BackstopJS reference and test stages; (12) Slack notification on visual regression test failures with diff image attachment. Generate 20+ scenarios for a design system component library or CMS-driven website.'
      },
      {
        id: 'chromatic-storybook',
        name: 'Chromatic + Storybook',
        description: 'Visual testing and review for UI component libraries.',
        prompt: 'Build a visual regression and component testing framework using Chromatic and Storybook 8 — the visual CI platform used by Atlassian, Adobe, and Auth0 to catch UI regressions in design systems. Include: (1) Storybook 8 setup: .storybook/main.ts with @storybook/react-vite or @storybook/angular framework, autodocs, and chromatic addon; (2) Stories for every component variant: per-component *.stories.ts with multiple named exports covering default, empty, loading, error, and edge-case states; (3) Story-level visual snapshots: Chromatic captures a snapshot per story per viewport (mobile 375, tablet 768, desktop 1280); (4) PR-gated visual review workflow: Chromatic GitHub integration blocks PR merge on unapproved visual changes, sends diff links to reviewers; (5) Auto-accept unchanged stories: Chromatic diff threshold configuration accepting anti-aliasing noise while flagging real pixel changes; (6) Interaction tests as visual specs: play() functions simulating user interactions (click, type, hover) with @storybook/test expect() assertions running as part of visual CI; (7) Storybook accessibility addon (addon-a11y) running axe-core on every story story combined with visual diffs; (8) Design token change detection: assert design token updates visually manifest across all consuming component stories; (9) Chromatic component-level visual regression: --only-changed flag running diff only for stories whose source files changed in PR; (10) Turbosnap: Chromatic turbosnap integration skipping unchanged stories for faster CI; (11) chromatic --exit-zero-on-changes vs --exit-once-uploaded CI exit code strategies; (12) GitHub Actions with npx chromatic --project-token. Generate 20+ stories and interaction tests for a React or Angular design system component library.'
      },
      {
        id: 'playwright-visual',
        name: 'Playwright Native Snapshots',
        description: 'Built-in visual comparison without external services.',
        prompt: "Build a visual regression framework using Playwright's built-in visual comparison (toHaveScreenshot). Include full-page and element-level snapshots, multi-browser cross-rendering comparison, threshold-based pixel difference tolerance, mask configuration for dynamic elements, CI snapshot update workflow with GitHub artifact storage, diff annotation in PR reports, and animated element stabilization helpers."
      },
      {
        id: 'applitools-ai',
        name: 'Applitools AI Visual Testing',
        description: 'AI-powered visual testing that ignores irrelevant rendering differences.',
        prompt: 'Build a visual testing framework using Applitools Eyes with Playwright or Selenium. Include intelligent AI-based diff matching (ignoring rendering noise), layout testing mode for responsive designs, component-level visual tests, cross-browser/device cloud grid execution, root cause analysis for failures, batch management for sprint-based baselines, and Applitools Dashboard API integration for reporting.'
      },
      {
        id: 'lost-pixel',
        name: 'Lost Pixel (Open Source Visual Regression)',
        description: 'Self-hosted pixel-diff testing with GitHub Actions and Storybook/page screenshots.',
        prompt: 'Build a self-hosted visual regression framework using Lost Pixel. Include Storybook story screenshot capture for every component story, full-page screenshots for critical application routes, pixel-difference threshold configuration per test, baseline image management with Git LFS, GitHub Actions workflow with lost-pixel update mode for baseline refresh, PR comment annotations showing changed screenshots, and a Docker Compose setup for running the visual suite locally without cloud dependencies.'
      },
      {
        id: 'playwright-visual-ai',
        name: 'Playwright + AI Diff (Argos / Diffy)',
        description: 'AI-assisted screenshot comparison ignoring render noise and focusing on real regressions.',
        prompt: 'Create a visual regression framework combining Playwright screenshots with Argos CI or Diffy AI-powered diff analysis. Include full-page and component-level screenshot capture across desktop/tablet/mobile viewports, AI-assisted diff filtering to ignore anti-aliasing and font rendering noise, threshold-based pixel tolerance with override per element, screenshot stabilization helpers for animations and dynamic dates, PR status checks from Argos or Diffy blocking merge on unapproved visual changes, and baseline branching strategy for feature branch visual reviews.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 21. BDD & Acceptance Testing
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'bdd-acceptance-testing',
    name: 'BDD & Acceptance Testing',
    description: 'Behaviour-Driven Development frameworks that bridge business requirements and automated tests.',
    icon: 'ClipboardList',
    category: 'bdd',
    collection: 'core-engineering',
    domains: [
      'E-Commerce User Stories', 'Banking & Insurance Scenarios', 'Healthcare Workflows',
      'SaaS Product Features', 'Government & Public Sector', 'Telecom Service Flows'
    ],
    subTemplates: [
      {
        id: 'cucumber-java',
        name: 'Cucumber (Java / Spring Boot)',
        description: 'Gherkin-driven acceptance tests for Java Spring Boot APIs and services.',
        prompt: 'Build a Cucumber BDD testing framework for a Java Spring Boot application. Include feature files with Given/When/Then scenarios, step definitions using Spring Boot Test context, DataTable and DocString parameter types, scenario outline for data-driven tests, tags for smoke/regression suites, Spring MockMvc integration for API acceptance tests, Allure Cucumber reporting, and Maven Surefire integration for CI parallel execution.'
      },
      {
        id: 'cucumber-js-playwright',
        name: 'Cucumber.js + Playwright (Web)',
        description: 'BDD end-to-end tests combining Cucumber.js feature files with Playwright.',
        prompt: 'Create a Cucumber.js and Playwright BDD framework for web applications. Include Gherkin feature files for business-readable user scenarios, step definitions wiring to Playwright page actions, world context sharing between steps, Before/After hooks for setup and teardown, custom formatters for HTML and JSON reports, screenshot attachment on failure, tags for @smoke @regression @slow filtering, and GitHub Actions matrix for parallel feature file execution.'
      },
      {
        id: 'specflow-dotnet',
        name: 'SpecFlow (.NET / C#)',
        description: 'BDD acceptance testing for .NET applications using SpecFlow and xUnit.',
        prompt: 'Build a SpecFlow BDD testing framework for a .NET application. Include feature files with Gherkin scenarios, step definition bindings with dependency injection via BoDi, table and multiline string arguments, background steps for shared preconditions, hooks (BeforeScenario/AfterScenario), xUnit parallel execution, SpecFlow LivingDoc HTML documentation generation, and Azure DevOps Test Plans integration for requirement traceability.'
      },
      {
        id: 'behave-python',
        name: 'Behave (Python)',
        description: 'BDD framework for Python applications using Behave and Gherkin feature files.',
        prompt: 'Create a Behave BDD testing framework for a Python application. Include feature files with Given/When/Then steps, step implementations with context fixture injection, environment.py hooks for setup/teardown, tags and command-line filtering, table and text parameters, fixture reuse patterns, Allure-Behave reporting, and GitHub Actions CI with pytest-bdd migration path notes.'
      },
      {
        id: 'pytest-bdd',
        name: 'pytest-bdd (Python)',
        description: 'Lightweight BDD for Python teams already using pytest.',
        prompt: 'Build a pytest-bdd testing framework. Include feature files with Gherkin scenarios, fixture-based step definitions reusing pytest fixtures, scenario outlines with parametrize, scenario-level given/when/then hooks, tag-based test selection with -k filtering, integration with existing pytest plugins (coverage, xdist, Allure), and GitHub Actions CI configuration showing pytest-bdd alongside regular pytest test suites.'
      },
      {
        id: 'robot-framework-web',
        name: 'Robot Framework (Web / API)',
        description: 'Keyword-driven BDD testing for web and API acceptance scenarios.',
        prompt: 'Build a Robot Framework acceptance testing suite. Include test suites with keyword-driven scenarios, SeleniumLibrary and Browser Library (Playwright) keywords for web testing, RequestsLibrary for REST API tests, custom Python keywords for complex logic, resource files for reusable keyword sets, variable files per environment, log and report HTML output, pabot parallel execution setup, and Jenkins/GitHub Actions CI integration.'
      },
      {
        id: 'serenity-bdd',
        name: 'Serenity BDD (Java)',
        description: 'Full-stack BDD with living documentation and screenplay pattern.',
        prompt: 'Create a Serenity BDD framework using Java and JUnit 5 or Cucumber. Include screenplay pattern actors with abilities and tasks, web tests using Serenity WebDriver wrappers, REST API tests with Serenity REST, requirement hierarchy linking to Jira stories, living documentation with Serenity reports showing coverage of requirements, parallel execution with JUnit Platform, and Maven/Gradle build integration with CI-aware report publishing.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 22. Test Data Management
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'test-data-management',
    name: 'Test Data Management',
    description: 'Generate, mask, anonymize, and seed realistic test data for all testing layers.',
    icon: 'Layers',
    category: 'testdata',
    collection: 'data-ai',
    domains: [
      'Financial Services', 'Healthcare & Life Sciences', 'E-Commerce & Retail',
      'Telecommunications', 'HR & Payroll Systems', 'Government & Identity'
    ],
    subTemplates: [
      {
        id: 'faker-js',
        name: 'Faker.js (JavaScript / TypeScript)',
        description: 'Generate realistic fake data for JS/TS test suites and fixtures.',
        prompt: 'Build a test data generation library using Faker.js for a JavaScript/TypeScript project. Include typed factory functions for all domain entities (users, orders, products, addresses), locale-aware data generation for multi-region tests, seeded deterministic generation for reproducible test runs, relationship-aware builders ensuring referential integrity, large-dataset performance fixtures using batch generation, integration with Prisma/TypeORM seeding scripts, and a Storybook decorator system for component-level mock data.'
      },
      {
        id: 'faker-python',
        name: 'Faker (Python)',
        description: 'Python test data factories using Faker and factory_boy for Django/SQLAlchemy models.',
        prompt: 'Create a Python test data generation framework using Faker and factory_boy. Include factory classes for all Django or SQLAlchemy models, SubFactory relationships for nested object graphs, LazyAttribute for computed fields, Trait system for scenario-specific data variants, locale providers for multi-language data, sequence generation for uniqueness constraints, factory fixtures integrated with pytest, and conftest.py seeding helpers for integration test databases.'
      },
      {
        id: 'java-faker',
        name: 'JavaFaker / Instancio (Java)',
        description: 'Java test data generation using Instancio and JavaFaker for JUnit/TestNG suites.',
        prompt: 'Build a Java test data generation framework using Instancio and JavaFaker. Include Instancio model generation with custom field selectors, JavaFaker providers for business domain data (IBAN, NPI, SSN, VIN), builder pattern wrappers for domain objects, ignore/fill selectors for partial generation, list and set collection generation, Spring Boot test integration with @ExtendWith fixtures, and JUnit 5 parameterized test integration using @MethodSource with generated datasets.'
      },
      {
        id: 'synthetic-data-vault',
        name: 'Synthetic Data Vault (SDV)',
        description: 'ML-based synthetic tabular data generation preserving statistical distributions.',
        prompt: 'Create a synthetic data generation pipeline using Synthetic Data Vault (SDV). Include real-data profiling to learn schema and statistical distributions, GaussianCopula and CTGAN model training on anonymized production snapshots, multi-table relational synthesis preserving foreign key relationships, data quality evaluation with sdmetrics (Column Shapes, Table Structure, Referential Integrity), synthetic dataset export to CSV/Parquet for integration test seeding, and a CI job refreshing synthetic datasets on schema changes.'
      },
      {
        id: 'presidio-masking',
        name: 'Presidio Data Masking & Anonymization',
        description: 'PII detection and anonymization for GDPR/HIPAA-compliant test data.',
        prompt: 'Build a data masking and anonymization framework using Microsoft Presidio. Include PII entity recognition (name, email, phone, SSN, credit card, IBAN) with multi-language NLP models, custom recognizer plugins for domain-specific identifiers, anonymization operators (replace, mask, hash, redact, encrypt) per entity type, reversible pseudonymization with encryption key management, batch processing pipeline for database dump anonymization, GDPR/HIPAA compliance report generation, and pytest integration for masked fixture loading.'
      },
      {
        id: 'testcontainers-seeding',
        name: 'Testcontainers + Data Seeding Strategy',
        description: 'Database-in-container seeding patterns for isolated, repeatable test data.',
        prompt: 'Create a test data seeding strategy using Testcontainers. Include schema-per-test isolation patterns for Postgres/MySQL, Flyway/Liquibase migration execution on container startup, seed script sets per scenario (happy path, edge cases, error states), shared container with transaction rollback for fast test isolation, snapshot/restore using Docker layer caching, data loader utilities for CSV/JSON fixture import, and CI optimization with pre-built container images for common seed states.'
      },
      {
        id: 'microcks-mock-data',
        name: 'Microcks API Mock Data',
        description: 'Contract-aligned mock data for REST, GraphQL, and messaging API tests.',
        prompt: 'Build a Microcks-based API mock data management framework. Include OpenAPI spec import with example-driven mock responses, Postman Collection import for legacy API mocks, GraphQL schema mock setup, templated dynamic response generation using request context, multi-example response sets for state simulation, Microcks Testcontainers integration for local test isolation, automated spec-to-mock sync pipeline, and a mock data catalog documentation page generated from Microcks API.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 23. Usability & UX Testing
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'usability-ux-testing',
    name: 'Usability & UX Testing',
    description: 'Structured frameworks to measure, evaluate, and improve user experience quality.',
    icon: 'Users',
    category: 'usability',
    collection: 'product-experience',
    domains: [
      'Consumer Mobile Apps', 'B2B SaaS Platforms', 'E-Commerce Checkout Flows',
      'Healthcare Patient Portals', 'Banking & Financial Apps', 'Public Sector Services'
    ],
    subTemplates: [
      {
        id: 'sus-measurement',
        name: 'System Usability Scale (SUS) Framework',
        description: 'Standardised SUS survey automation and scoring dashboard.',
        prompt: 'Build a System Usability Scale measurement framework. Include a SUS questionnaire distribution module with 10 standardised items, digital survey delivery via email/Typeform/embed, automated SUS score calculation (0-100), percentile ranking and adjective rating (Poor/OK/Good/Excellent/Best), statistical significance testing between product versions, cohort segmentation by user persona, longitudinal trend tracking across releases, and an HTML/PDF SUS scorecard report with benchmarks against industry averages.'
      },
      {
        id: 'heuristic-evaluation',
        name: 'Nielsen Heuristic Evaluation Protocol',
        description: 'Structured heuristic evaluation using Nielsens 10 usability principles.',
        prompt: 'Create a heuristic evaluation framework based on Nielsen Norman 10 usability heuristics. Include evaluation worksheets for each heuristic (visibility of system status, match with real world, user control, consistency, error prevention, recognition over recall, flexibility, aesthetics, error recovery, help/documentation), severity rating scale (0-4), aggregated issue heat map by page/component, evaluator agreement tracking for multi-evaluator sessions, prioritised issue backlog export to Jira/Linear, and a Figma annotation plugin template for in-design heuristic marking.'
      },
      {
        id: 'maze-usability',
        name: 'Maze / Optimal Workshop Task Testing',
        description: 'Unmoderated remote usability task testing with success rates and path analysis.',
        prompt: 'Build an unmoderated remote usability testing framework using Maze or Optimal Workshop. Include task scenario scripts with clear success criteria, click path matrix analysis identifying dead-end navigation, task completion rate and time-on-task metrics, misclick heatmaps per task, first-click accuracy tests for information architecture validation, tree testing for navigation structure evaluation, participant screener scripts, automated report generation with executive summary, and integration with product analytics tools for triangulation.'
      },
      {
        id: 'session-recording-analysis',
        name: 'Session Recording Analysis Framework',
        description: 'Systematic analysis of FullStory/Hotjar session recordings for UX issues.',
        prompt: 'Create a session recording analysis framework for FullStory, Hotjar, or Microsoft Clarity. Include a structured tagging taxonomy for issue classification (rage click, dead click, form abandonment, scroll depth, error encounter), segmentation rules by user journey stage, funnel analysis from session data with drop-off identification, frustration signal dashboard (rage clicks by element, error messages encountered), automated flagging rules for high-severity sessions, weekly UX digest report template, and integration with product roadmap prioritization scoring.'
      },
      {
        id: 'cognitive-load-testing',
        name: 'Cognitive Load Testing Protocol',
        description: 'Measure and reduce cognitive load using eye-tracking proxies and task complexity scoring.',
        prompt: 'Build a cognitive load testing framework. Include NASA-TLX workload assessment questionnaire integration, reading flow analysis using Flesch-Kincaid readability scores for in-app text, visual complexity scoring using automated image analysis (element density, color entropy), interaction complexity metrics (clicks per task, decision points), A/B comparison protocol for design variants, fixation pattern proxy via timed gaze emulation with Playwright, participant think-aloud protocol script, and a cognitive load scorecard per screen with actionable simplification recommendations.'
      },
      {
        id: 'eye-tracking-simulation',
        name: 'Attention Heatmap & Fold Analysis',
        description: 'Predict visual attention using AI-based saliency models and scroll fold analysis.',
        prompt: 'Create an attention and fold analysis framework using Attention Insight or Vizcom AI saliency models. Include above-the-fold content effectiveness scoring, AI-predicted attention heatmap generation for design mockups and live pages, CTA (call-to-action) visibility scoring, contrast and visual hierarchy assessment, banner blindness detection via repeated-element analysis, scroll depth fold analysis with Playwright instrumentation, before/after comparison workflow for redesigns, and an automated design review report for stakeholders.'
      },
      {
        id: 'ux-regression-framework',
        name: 'UX Regression Testing Suite',
        description: 'Automated checks to prevent UX regressions in navigation, copy, and interaction patterns.',
        prompt: 'Build a UX regression testing framework using Playwright and custom heuristic checks. Include navigation regression tests (every primary/secondary nav item resolves, breadcrumb accuracy), copy regression checks (error messages, empty states, tooltips unchanged), interaction pattern tests (modal open/close, form validation messages, loading states), responsive layout breakpoint assertions (content overflow, tap target size), onboarding flow completion regression, and a UX regression report comparing metrics across releases with visual diff integration.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 24. Internationalisation & Localisation Testing
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'i18n-l10n-testing',
    name: 'Internationalisation & Localisation Testing',
    description: 'Ensure correct translation, locale-aware formatting, and RTL layout across all markets.',
    icon: 'Languages',
    category: 'i18n',
    collection: 'product-experience',
    domains: [
      'Global SaaS Products', 'E-Commerce Multi-Region', 'Financial Services Portals',
      'Government & Public Sector', 'Healthcare Multi-Language', 'Gaming & Entertainment'
    ],
    subTemplates: [
      {
        id: 'i18next-validation',
        name: 'i18next / react-i18next Validation',
        description: 'Missing key detection, namespace coverage, and interpolation tests for i18next.',
        prompt: 'Build an i18next and react-i18next validation framework. Include missing translation key detection across all supported locales, unused key scanning with i18next-scanner, interpolation variable completeness checks (all {{variable}} placeholders present in every locale), pluralisation rule tests (one/other/few/many forms), namespace separation and lazy-loading tests, locale fallback chain validation, automated key extraction CI pipeline, and a translation coverage dashboard showing completion percentage per locale.'
      },
      {
        id: 'pseudo-localization',
        name: 'Pseudo-Localisation Testing',
        description: 'Expand text with pseudo-locale characters to catch hardcoded strings and layout overflow.',
        prompt: 'Create a pseudo-localisation testing framework. Include automated pseudo-locale generation (accented characters, 40% text expansion, bidirectional markers, bracket wrapping), Playwright screenshots in pseudo-locale for text overflow and truncation detection, hardcoded string detection via diff between pseudo and base locale renders, layout visual regression comparison between en-US and pseudo locale, CI integration preventing merges with pseudo-locale visual failures, and a report listing all detected hardcoded strings by component.'
      },
      {
        id: 'rtl-layout-testing',
        name: 'RTL (Right-to-Left) Layout Testing',
        description: 'Visual and functional tests for Arabic, Hebrew, and Persian RTL interfaces.',
        prompt: 'Build a right-to-left layout testing framework using Playwright. Include dir="rtl" rendering tests comparing element positions against LTR baseline, text alignment and margin mirroring assertions, icon and chevron direction flip validation, form input cursor direction tests, bidirectional text (bidi) rendering checks for mixed LTR/RTL content, scrollbar position assertions, RTL-specific visual regression snapshots per page, and automated RTL CSS audit using stylelint-rtlcss rules detecting non-mirrored properties.'
      },
      {
        id: 'icu-message-format',
        name: 'ICU Message Format Validation',
        description: 'Parse and test ICU message format strings for plural, select, and date patterns.',
        prompt: 'Create an ICU Message Format validation framework. Include ICU message syntax parsing and error detection across all translation files, plural category tests for CLDR-defined rules (zero/one/two/few/many/other) per target locale, select statement completeness checks, nested select and plural validation, number and date skeleton format tests per locale, MessageFormat compilation errors detection in CI, and a locale-specific ICU rendering test suite validating formatted output against expected strings for representative input values.'
      },
      {
        id: 'locale-data-formats',
        name: 'Locale-Aware Data Format Testing',
        description: 'Date, number, currency, address, and phone format validation per locale.',
        prompt: 'Build a locale-aware data format testing framework using Intl APIs and locale test fixtures. Include date format assertions (dd/MM/yyyy vs MM/dd/yyyy vs yyyy-MM-dd) per 20+ locales, number format tests (decimal separator, thousands grouping, RTL digit rendering), currency symbol position and format tests (before/after amount), address field ordering tests per country, phone number format validation using libphonenumber, postal code pattern tests, and a locale format regression suite that runs on every translation file update.'
      },
      {
        id: 'cldr-encoding',
        name: 'Character Encoding & CLDR Compliance',
        description: 'Unicode, UTF-8 BOM, special character, and CLDR data validation tests.',
        prompt: 'Create a character encoding and CLDR compliance testing framework. Include UTF-8 encoding validation for all translation files (no BOM, no mojibake), locale identifier conformance to BCP 47 tags, CLDR plural rule implementation accuracy tests per locale, special character rendering tests (em dash, non-breaking space, ellipsis, quotation marks), surrogate pair handling tests, zero-width space and joiners in Arabic/Hebrew text, and automated encoding audit CI step using charset-normalizer and ICU4J validators.'
      },
      {
        id: 'locale-e2e-flows',
        name: 'Localised E2E User Flow Testing',
        description: 'Full user journey tests executed in multiple locale contexts simultaneously.',
        prompt: 'Build a localised end-to-end testing framework using Playwright. Include locale fixture setup (Accept-Language header, timezone, currency preference, browser locale), parallel test execution across 5+ target locales (en-US, de-DE, ja-JP, ar-SA, fr-FR), locale-specific selector strategies for translated button labels using data-testid, visual regression snapshots per locale per page, date picker interaction tests using locale-appropriate navigation, checkout and form submission tests with locale-correct input formats, and a locale comparison report highlighting differences between market test runs.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 25. Mutation Testing
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'mutation-testing',
    name: 'Mutation Testing',
    description: 'Validate test suite quality by injecting code mutations to expose weak assertions.',
    icon: 'FlaskConical',
    category: 'mutation',
    collection: 'core-engineering',
    domains: [
      'Core Business Logic', 'Financial Calculation Engines', 'Security-Critical Code',
      'Data Transformation Pipelines', 'State Machines & Workflows', 'Algorithm Libraries'
    ],
    subTemplates: [
      {
        id: 'stryker-js',
        name: 'Stryker Mutator (JavaScript / TypeScript)',
        description: 'Mutation testing for JS/TS codebases using Stryker with Jest or Vitest.',
        prompt: 'Build a Stryker Mutator framework for a JavaScript/TypeScript project. Include Stryker configuration for Jest or Vitest test runner, mutator selection tuned for business logic files (arithmetic, logical, conditional, string boundary), incremental mutation mode for CI performance, per-file mutation score thresholds in stryker.config.mjs, HTML mutation report with surviving mutant drill-down, PR comment integration showing mutation score delta, and a weekly mutation score trend chart showing improvement over time.'
      },
      {
        id: 'pitest-java',
        name: 'PIT Mutation Testing (Java)',
        description: 'Java mutation testing with PIT (Pitest) and coverage-based incremental analysis.',
        prompt: 'Create a PIT mutation testing framework for a Java project. Include Maven/Gradle PIT plugin configuration targeting business logic packages, mutator groups selection (DEFAULTS plus STRONGER set), JVM arg tuning for parallel mutation execution, coverage-based filtering to only mutate covered lines, coverage threshold enforcement in the build (90% line, 80% mutation), HTML and XML report generation, integration with SonarQube quality gate via PIT-to-SonarQube bridge, and a GitHub Actions workflow running incremental mutation on changed files only.'
      },
      {
        id: 'mutmut-python',
        name: 'mutmut (Python)',
        description: 'Python mutation testing with mutmut and pytest for measuring test suite quality.',
        prompt: 'Build a mutmut mutation testing framework for a Python project. Include mutmut configuration for targeted module mutation, pytest runner integration with parallel execution, surviving mutant analysis workflow (list, show, HTML report), mutation cache usage for incremental re-runs on code changes, threshold enforcement in CI (minimum 75% mutation score), integration with coverage.py to skip un-covered lines, and a GitHub Actions workflow generating mutation score badge and posting PR summary comments.'
      },
      {
        id: 'stryker-dotnet',
        name: 'Stryker.NET (C# / .NET)',
        description: 'Mutation testing for .NET solutions using Stryker.NET with xUnit or NUnit.',
        prompt: 'Create a Stryker.NET mutation testing framework for a C# solution. Include stryker-config.json with project targeting, mutator configuration (arithmetic, string, logical, linq, initializer), baseline comparison mode showing mutation score changes per PR, mutation score threshold gates per project, HTML dashboard generation, Azure DevOps pipeline integration with test results attachment, and separate Stryker runs configured for unit vs integration test projects with different thresholds.'
      },
      {
        id: 'property-based-js',
        name: 'Property-Based Testing (fast-check, JS/TS)',
        description: 'Property-based testing with fast-check to complement mutation testing coverage.',
        prompt: 'Build a property-based testing framework using fast-check for a JavaScript/TypeScript project. Include Arbitrary generators for domain types (user, order, price, date range), property definitions for business invariants (commutativity, idempotency, round-trip encoding), shrinking configuration for minimal counterexample discovery, model-based testing for stateful components using fast-check commands, integration with Jest/Vitest for unified test reporting, CI seed pinning for reproducible failures, and a guide on identifying which functions benefit most from property-based coverage.'
      },
      {
        id: 'property-based-python',
        name: 'Property-Based Testing (Hypothesis, Python)',
        description: 'Hypothesis-powered property tests to complement unit and mutation testing.',
        prompt: 'Create a Hypothesis property-based testing framework for Python. Include composite strategy definitions for domain model generators, @given decorators on business logic functions with domain-appropriate strategies, database stateful testing using RuleBasedStateMachine, assume() guards for precondition filtering, deadline and settings profiles per test scope, example database persistence for regression, integration with pytest and coverage.py, Django/SQLAlchemy-specific strategies using hypothesis-django, and a guide prioritising which code paths benefit most from property tests.'
      },
      {
        id: 'mutation-ci-gates',
        name: 'Mutation Score CI Gates & Trends',
        description: 'Enforce mutation score thresholds and track quality trends across releases.',
        prompt: 'Build a mutation score quality gate and trend tracking system. Include aggregating mutation reports from Stryker/PIT/mutmut into a unified score format, per-module threshold configuration (core logic 85%, utilities 70%, adapters 60%), CI pipeline step blocking merges below threshold, historical mutation score storage in a time-series database (InfluxDB or Postgres), Grafana dashboard showing mutation score trend per module per sprint, PR badge generation showing before/after mutation score, and a weekly mutation health digest Slack report highlighting regressions and improvements.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // 26. Exploratory & Session-Based Testing
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  {
    id: 'exploratory-testing',
    name: 'Exploratory & Session-Based Testing',
    description: 'Structured session charters, heuristic frameworks, and bug bash playbooks for discovery-led testing.',
    icon: 'Compass',
    category: 'exploratory',
    collection: 'governance-risk',
    domains: [
      'SaaS / B2B', 'E-Commerce / Retail', 'Healthcare', 'FinTech',
      'Gaming', 'Media & Streaming', 'Government & Public Sector', 'Education & EdTech'
    ],
    subTemplates: [
      {
        id: 'session-charter-pack',
        name: 'Session Charter Pack',
        description: 'Structured session-based test management (SBTM) charters for a new feature, release, or risk area.',
        type: 'playbook',
        prompt: 'Generate a comprehensive session-based testing (SBTM) charter pack. Include: (1) a charter template with mission, areas to test, design notes, and time-box duration; (2) 5 example charters covering login/auth, data integrity, edge cases, error handling, and performance perception; (3) a debrief note template (bugs found, issues, questions, opportunity); (4) a session metrics summary format tracking charter count, defect count, % test vs setup vs bugs; (5) a risk-area prioritisation matrix (likelihood x impact) for directing sessions; (6) guidance on pairing sessions with exploratory personas (new user, power user, adversarial user). Produce as structured Markdown documents.'
      },
      {
        id: 'heuristic-testing-plan',
        name: 'Heuristic Testing Plan',
        description: 'Heuristic-driven test coverage plan using SFDPOT, FEW HICCUPPS, and RCRCRC mnemonics.',
        type: 'playbook',
        prompt: 'Create a heuristic-driven test coverage plan for a software system under test. Include: (1) SFDPOT framework application (Structure, Function, Data, Platform, Operations, Time); (2) FEW HICCUPPS consistency heuristics checklist applied to the system; (3) RCRCRC rapid test plan template (Recent, Core, Risk, Configuration, Repaired, Chronic); (4) a quality attribute coverage checklist (functionality, reliability, usability, performance, security, compatibility, maintainability); (5) a coverage gap analysis table; (6) a test oracle mapping document showing what correct behaviour looks like for each area. Produce as structured Markdown documents with tables and checklists.'
      },
      {
        id: 'bug-bash-playbook',
        name: 'Bug Bash Playbook',
        description: 'End-to-end bug bash event guide — preparation, execution rules, triage, and metrics reporting.',
        type: 'playbook',
        prompt: 'Generate a complete bug bash event playbook. Include: (1) pre-event preparation checklist (build deployment, test accounts, environment access, scope briefing); (2) participant onboarding guide with role cards (facilitator, triage lead, developer on standby, testers); (3) scope definition template (in-scope features, out-of-scope areas, sanity exclusions); (4) bug submission form template (title, steps to reproduce, expected vs actual, severity, screenshot reference); (5) real-time triage board structure (new, confirmed, duplicate, out-of-scope, deferred); (6) session time-box schedule (2-hour format with kickoff, testing sprint, triage, retrospective); (7) post-event metrics report template (bugs found by severity, area, participant; bug bash value score). Produce as structured Markdown documents.'
      },
      {
        id: 'risk-based-test-map',
        name: 'Risk-Based Test Coverage Map',
        description: 'Risk analysis matrix and coverage map for prioritising exploratory testing by business impact.',
        type: 'playbook',
        prompt: 'Create a risk-based test coverage map for a software release. Include: (1) risk identification workshop template with stakeholder input prompts; (2) risk register table (risk ID, area, likelihood 1-5, impact 1-5, risk score, mitigation strategy, test coverage type); (3) risk prioritisation heat map (HTML/Markdown table with colour-coded cells by risk score); (4) test coverage allocation plan mapping high/medium/low risk areas to session count, automation depth, and review frequency; (5) residual risk acceptance criteria (what risk level triggers go/no-go escalation); (6) risk trend tracking table for comparing risk profile across releases; (7) mapping risk areas to ISTQB test types (functional, non-functional, regression, exploratory). Produce as structured Markdown documents with tables.'
      },
      {
        id: 'exploratory-test-report',
        name: 'Exploratory Test Report Template',
        description: 'Stakeholder-ready report template for communicating exploratory testing findings, coverage, and risk.',
        type: 'playbook',
        prompt: 'Generate an exploratory testing report template for stakeholder communication. Include: (1) executive summary section (scope, sessions completed, total time-box hours, key findings in 3 bullets); (2) session coverage table (charter name, tester, duration, area covered, bugs found, quality assessment); (3) defect summary table (ID, title, severity, component, status, root cause category); (4) quality risk assessment (areas well-tested, areas needing attention, areas not covered and reason); (5) product quality statement (narrative summary of overall confidence level with supporting evidence); (6) recommendations section (additional testing needed, automation candidates, process improvements); (7) appendix templates for session notes and raw debrief logs. Produce as structured Markdown with clear section headings.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // 27. UAT & Release Validation
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  {
    id: 'uat-release-validation',
    name: 'UAT & Release Validation',
    description: 'Acceptance test packs, release gates, sign-off matrices, and readiness scorecards for delivery teams.',
    icon: 'BadgeCheck',
    category: 'uat',
    collection: 'governance-risk',
    domains: [
      'Banking & Finance', 'Healthcare', 'Government & Public Sector', 'Insurance',
      'E-Commerce / Retail', 'SaaS / B2B', 'ERP / CRM Platforms', 'Telecom'
    ],
    subTemplates: [
      {
        id: 'acceptance-test-pack',
        name: 'Acceptance Test Pack',
        description: 'Business acceptance test cases derived from user stories and acceptance criteria.',
        type: 'playbook',
        prompt: 'Create a business acceptance test pack for a software feature or release. Include: (1) acceptance test case template (ID, user story reference, scenario title, given/when/then format, expected outcome, pass/fail); (2) 10 example acceptance test cases for a financial transaction feature (balance check, payment initiation, confirmation, failure handling, receipt generation, limit enforcement, currency handling, audit log, reversal, notification); (3) test data requirements table (persona, account type, balance, permissions needed); (4) acceptance criteria traceability matrix mapping each test case to a user story and business requirement; (5) out-of-scope exclusions register; (6) defect classification guide (blocker vs critical vs minor for UAT context); (7) UAT pass criteria definition (% cases passed, zero blocker threshold). Produce as structured Markdown with tables.'
      },
      {
        id: 'uat-readiness-gate',
        name: 'UAT Entry/Exit Readiness Gate',
        description: 'Entry and exit criteria checklist ensuring the system is ready for UAT and ready to release.',
        type: 'playbook',
        prompt: 'Generate a UAT readiness gate document with entry and exit criteria. Include: (1) UAT entry criteria checklist (build deployed to UAT environment, smoke test passed, test data available, user accounts provisioned, test cases reviewed and signed off, defects from SIT resolved or deferred with justification); (2) UAT exit criteria checklist (all must-pass scenarios passed, blocker defect count = 0, critical defect count within agreed threshold, all deferred defects logged with risk acceptance, sign-off obtained from business representative, test evidence packaged and archived); (3) environment readiness checklist (URL accessible, integrations mocked or live, monitoring enabled, rollback plan tested); (4) UAT execution status dashboard template (total test cases, passed, failed, blocked, not run, pass rate %, defect count by severity); (5) go/no-go decision matrix with stakeholder ownership; (6) escalation path for exit criterion failures. Produce as structured Markdown with tables and checklists.'
      },
      {
        id: 'release-scorecard',
        name: 'Release Readiness Scorecard',
        description: 'Weighted quality scorecard aggregating test results, defect metrics, and risk signals for release decisions.',
        type: 'playbook',
        prompt: 'Create a release readiness scorecard for a software delivery. Include: (1) quality signal collection table (test coverage %, functional pass rate %, performance regression delta, accessibility score, security vulnerability count, code quality gate status); (2) weighted scoring model (each signal scored 0-10, weights defined per signal, composite weighted score with thresholds: green ≥8.0, amber 6.0-7.9, red <6.0); (3) per-signal evidence links template; (4) historical release scorecard comparison table (last 3 releases); (5) risk acceptance register for amber/red signals (risk owner, mitigation, acceptance rationale); (6) stakeholder sign-off matrix (product owner, QA lead, security, ops, business sponsor — each with sign-off status and date); (7) release decision output (Ship / Ship with conditions / Hold) with auto-generated rationale narrative. Produce as structured Markdown with scoring tables.'
      },
      {
        id: 'sign-off-matrix',
        name: 'Stakeholder Sign-Off Matrix',
        description: 'Formal sign-off tracking document showing who approved what and under what conditions.',
        type: 'playbook',
        prompt: 'Generate a stakeholder sign-off matrix for software release approval. Include: (1) sign-off matrix table (stakeholder name, role, area of responsibility, sign-off status, date, conditions/caveats, escalation contact); (2) standard stakeholder roles and their sign-off scope (product owner: functional completeness; QA lead: quality gate status; security lead: vulnerability sign-off; operations: deployment readiness; legal/compliance: regulatory coverage; business sponsor: UAT acceptance); (3) conditional approval flow (how to proceed when a stakeholder signs off with conditions); (4) objection resolution process (raised, discussed, resolved or escalated); (5) release communication plan template (who gets notified at approval, deployment start, deployment complete, rollback if triggered); (6) sign-off audit trail format for regulatory evidence. Produce as structured Markdown with tables.'
      },
      {
        id: 'cucumber-uat-scaffold',
        name: 'Cucumber UAT Automation Scaffold',
        description: 'Runnable Cucumber BDD framework pre-configured for UAT scenarios with business-readable reports.',
        type: 'framework',
        prompt: 'Build a Cucumber-based UAT automation framework. Include: Cucumber with Java (JUnit 5) or JavaScript (Playwright-Cucumber), feature files written in plain business language for an e-commerce checkout flow (add to cart, address entry, payment, order confirmation, order history), a step definitions layer with thin glue code delegating to service/page helpers, a Before/After hooks file for test data setup and teardown, a configuration file for UAT environment (base URL, credentials from env vars), an Allure or cucumber-html-reporter configuration, a Cucumber tag strategy (@uat, @regression, @smoke, @wip), a GitHub Actions workflow targeting the UAT environment, and a README written for business analysts explaining how to run and read the reports.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // 28. Observability & SLO Verification
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  {
    id: 'observability-testing',
    name: 'Observability & SLO Verification',
    description: 'Synthetic probes, SLI/SLO workbooks, trace assertions, and canary verification for platform teams.',
    icon: 'Activity',
    category: 'observability',
    collection: 'platform-reliability',
    domains: [
      'SaaS / B2B', 'Banking & Finance', 'E-Commerce / Retail', 'Telecom',
      'Healthcare', 'Media & Streaming', 'Cloud Platform Teams', 'FinTech'
    ],
    subTemplates: [
      {
        id: 'synthetic-monitoring-framework',
        name: 'Synthetic Monitoring with Checkly',
        description: 'Playwright-based synthetic checks deployed to Checkly for continuous production verification.',
        type: 'framework',
        prompt: 'Build a synthetic monitoring framework using Playwright and Checkly. Include: a Checkly CLI project structure (checkly.config.ts, checks/, __checks__/), browser checks for 3 critical user journeys (login flow, API health probe, order placement), API checks for key endpoints with latency assertions (p95 < 800ms, status 200), alert channel configuration (Slack, PagerDuty) as code, multi-region check scheduling (US-East, EU-West, AP-Southeast), a maintenance window configuration pattern, check group definitions with shared environment variables (BASE_URL, API_KEY from secrets), a CI/CD workflow that deploys checks on merge to main, and a README explaining the runbook for alert triage.'
      },
      {
        id: 'otel-trace-assertion',
        name: 'OpenTelemetry Trace Assertion Framework',
        description: 'Automated trace and span assertions verifying distributed system observability contracts.',
        type: 'framework',
        prompt: 'Build an OpenTelemetry trace assertion framework for a microservices system. Include: test utilities for querying Jaeger or Tempo trace backend via API (search by trace ID, by service, by operation), assertion helpers for span presence (service X called service Y), span attribute validation (http.status_code, db.statement, error.message), latency budget assertions (span duration < threshold), distributed context propagation tests (W3C TraceContext header), span event and link assertions, error span detection (otel.status_code=ERROR), a pytest or Jest test suite with example trace assertions for a checkout flow (frontend → order-service → payment-service → notification-service), and CI integration that runs assertions after integration test environment is seeded.'
      },
      {
        id: 'slo-workbook',
        name: 'SLI/SLO Definition Workbook',
        description: 'Service level indicator and objective definition templates with error budget burn rate calculations.',
        type: 'playbook',
        prompt: 'Generate a comprehensive SLI/SLO definition workbook for a platform team. Include: (1) SLI definition template (service, SLI name, what is being measured, good event definition, total event definition, data source, collection method); (2) SLO target template (SLI reference, target percentage, window type — rolling 28 days, compliance period, error budget in minutes); (3) worked examples with 5 standard SLIs (availability, latency p95, latency p99, error rate, freshness for data pipelines); (4) error budget burn rate calculation worksheet (fast burn: >14x rate for 1 hour = critical alert; slow burn: >1x rate for 3 days = warning); (5) SLO alerting policy design (multi-window multi-burn-rate alert thresholds); (6) SLO review cadence template (weekly error budget report, monthly SLO review agenda); (7) SLO violation post-mortem template. Produce as structured Markdown with tables and formulas.'
      },
      {
        id: 'canary-verification-plan',
        name: 'Canary Deployment Verification Plan',
        description: 'Automated verification gates and rollback criteria for canary and progressive delivery releases.',
        type: 'playbook',
        prompt: 'Create a canary deployment verification plan for a progressive delivery pipeline. Include: (1) canary promotion criteria (error rate delta < 0.1%, latency p99 delta < 50ms, no new error types in logs); (2) automated gate check specifications (metrics to query, prometheus/datadog query templates, evaluation window, pass/fail thresholds); (3) traffic split schedule (5% for 10 min → 25% for 30 min → 50% for 1 hour → 100% with full review); (4) rollback trigger criteria (automatic vs manual), rollback execution steps, and rollback verification checklist; (5) canary comparison dashboard layout (side-by-side baseline vs canary metrics for error rate, latency percentiles, throughput, saturation); (6) canary analysis automation configuration for Argo Rollouts or Spinnaker Kayenta; (7) stakeholder communication templates for canary start, promotion, and rollback events. Produce as structured Markdown.'
      },
      {
        id: 'alert-coverage-audit',
        name: 'Alerting Coverage Audit Playbook',
        description: 'Systematic audit of alert coverage gaps against SLOs, runbooks, and team response capacity.',
        type: 'playbook',
        prompt: 'Generate an alerting coverage audit playbook for an engineering team. Include: (1) alert inventory template (alert name, service, SLI it protects, trigger condition, severity, on-call team, runbook link, last fired, last tested); (2) coverage gap analysis — mapping each SLO to its alerting coverage and identifying SLOs with no alert; (3) alert quality checklist per alert (actionable?, runbook exists?, correct severity?, noise history — false positive rate); (4) toil scoring worksheet (% of alerts that require human action vs auto-resolve); (5) alert de-duplication review (grouped alerts that should be correlated); (6) runbook completeness checklist (diagnosis steps, escalation path, rollback option, communication template); (7) alerting improvement backlog template (gap, impact, proposed fix, owner, target sprint). Produce as structured Markdown with tables.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // 29. Disaster Recovery & Failover Testing
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  {
    id: 'dr-failover-testing',
    name: 'Disaster Recovery & Failover Testing',
    description: 'Backup restore verification, RTO/RPO planning, multi-region failover runbooks, and DR drill frameworks.',
    icon: 'RefreshCw',
    category: 'dr-testing',
    collection: 'platform-reliability',
    domains: [
      'Banking & Finance', 'Healthcare', 'Insurance', 'Government & Public Sector',
      'E-Commerce / Retail', 'SaaS / B2B', 'Telecom', 'Cloud Platform Teams'
    ],
    subTemplates: [
      {
        id: 'backup-restore-verification',
        name: 'Backup & Restore Verification Framework',
        description: 'Automated scripts verifying database and object storage backups can be restored within RTO targets.',
        type: 'framework',
        prompt: 'Build an automated backup and restore verification framework. Include: (1) PostgreSQL backup verification script (pg_dump backup integrity check, restore to isolated RDS instance, row count comparison pre/post restore, referential integrity check, timing measurement vs RTO target); (2) S3/Azure Blob object storage backup verification (list backup files, verify checksums, restore sample objects, validate metadata preservation); (3) backup inventory audit script (check all required backup jobs ran in last 24h, verify backup file exists and size > threshold, alert if backup missing); (4) restore drill scheduling configuration (weekly automated restore test, results logged to monitoring); (5) RTO/RPO measurement utilities (timestamp backup creation vs restore complete, calculate actual RPO from last good backup); (6) test report generation (backup health dashboard HTML). Include a GitHub Actions scheduled workflow running nightly.'
      },
      {
        id: 'db-backup-integrity',
        name: 'Database Backup Integrity Testing with pgTAP',
        description: 'pgTAP-based automated tests verifying restored database schema, data, and constraint integrity.',
        type: 'framework',
        prompt: 'Build a database backup integrity testing framework using pgTAP. Include: (1) pgTAP test suite verifying restored schema completeness (all tables, views, functions, indexes, triggers present); (2) row count validation tests (restored table row counts within expected range of source); (3) referential integrity constraint tests (foreign keys, unique constraints, not null constraints all enforced); (4) sample data spot-check tests (latest N records per critical table match expected structure); (5) sequence and identity column reset validation; (6) function and stored procedure existence and invocability tests; (7) automated restore-to-test-schema pipeline (pg_restore to isolated schema, run pgTAP, report results, drop test schema); (8) a Python orchestrator script managing the restore–test–cleanup cycle; (9) HTML test report generation and S3 upload. Include a GitHub Actions workflow triggering on schedule and on demand.'
      },
      {
        id: 'rto-rpo-plan',
        name: 'RTO/RPO Test Plan & Evidence Pack',
        description: 'Structured test plan measuring and evidencing Recovery Time Objective and Recovery Point Objective compliance.',
        type: 'playbook',
        prompt: 'Create an RTO/RPO test plan and evidence pack for a business-critical system. Include: (1) RTO/RPO target register (service, tier, agreed RTO in minutes, agreed RPO in minutes, business justification, owner); (2) failure scenario catalogue (database primary failure, datacenter outage, application pod crash loop, storage failure, network partition, third-party API outage); (3) test procedure for each scenario (pre-conditions, trigger steps, measurement method, stop condition, recovery verification); (4) measurement worksheet (scenario, trigger time, detection time, recovery start time, recovery complete time, actual RTO, data loss window, actual RPO, pass/fail vs target); (5) test evidence format (screenshots, monitoring graphs, command outputs, witness signatures); (6) test schedule template (quarterly DR drill calendar with ownership); (7) RTO/RPO breach action plan (escalation, emergency change process, interim mitigation). Produce as structured Markdown.'
      },
      {
        id: 'multi-region-failover-runbook',
        name: 'Multi-Region Failover Test Runbook',
        description: 'Step-by-step runbook for executing and validating active-standby and active-active failover scenarios.',
        type: 'playbook',
        prompt: 'Generate a multi-region failover test runbook for a cloud-hosted system. Include: (1) pre-drill checklist (notify stakeholders, confirm backup region is healthy, freeze deployments, snapshot current state, prepare rollback procedure); (2) active-standby failover procedure (promote standby database, update DNS/load balancer, verify application connectivity, validate session continuity); (3) active-active region loss procedure (reduce traffic weight in failed region, confirm health in surviving regions, verify data synchronisation lag); (4) verification checklist post-failover (all health checks green, no errors in application logs, monitoring dashboards show traffic flowing, synthetic checks passing in new region, alerting rules still active); (5) failback procedure checklist (pre-conditions, data resynchronisation, gradual traffic return, verification, retrospective note); (6) drill retrospective template (what worked, what failed, action items, updated RTO measurement). Produce as structured Markdown with numbered steps.'
      },
      {
        id: 'dr-drill-scenarios',
        name: 'DR Drill Scenario Library',
        description: 'Library of disaster recovery drill scenarios with severity levels, test scripts, and success criteria.',
        type: 'playbook',
        prompt: 'Create a disaster recovery drill scenario library for an engineering team. Include 8 detailed drill scenarios each with: scenario name, severity class (tier 1 critical / tier 2 important / tier 3 planned), description of failure condition, affected components, responsible team, drill frequency, step-by-step execution script, expected system behaviour, success criteria, evidence to collect, and typical RTO target. Scenarios to cover: (1) primary database failure, (2) entire availability zone loss, (3) CDN provider outage, (4) critical microservice complete failure, (5) object storage corruption/deletion, (6) identity provider (auth) outage, (7) third-party payment gateway outage (8) malicious data corruption requiring point-in-time restore. Add a drill planning calendar template and a post-drill scoring rubric. Produce as structured Markdown.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // 30. Migration & Upgrade Testing
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  {
    id: 'migration-testing',
    name: 'Migration & Upgrade Testing',
    description: 'Data migration validation, schema upgrade testing, pre/post reconciliation, and rollback verification frameworks.',
    icon: 'ArrowRightLeft',
    category: 'migration',
    collection: 'specialized-systems',
    domains: [
      'Banking & Finance', 'Healthcare', 'Government & Public Sector', 'ERP / CRM Platforms',
      'E-Commerce / Retail', 'Insurance', 'Telecom', 'SaaS / B2B'
    ],
    subTemplates: [
      {
        id: 'data-migration-validation',
        name: 'Data Migration Validation Framework',
        description: 'Row count, checksum, and field-level reconciliation framework for database migration projects.',
        type: 'framework',
        prompt: 'Build a data migration validation framework in Python using SQLAlchemy. Include: (1) source-to-target row count comparison per table with tolerance thresholds; (2) checksum/hash comparison for critical columns (configurable per table); (3) field-level data reconciliation report (sample N records per table, compare each mapped column value); (4) null/blank rate comparison (flag tables where null rate increased post-migration); (5) data type and constraint validation (numeric range checks, date format checks, referential integrity); (6) migration exclusion list management (tables/records intentionally not migrated, documented); (7) reconciliation report HTML generation (table status: pass/fail/warn, drill-down to row-level diffs); (8) configurable connection setup for source and target databases (PostgreSQL, MySQL, SQL Server, Oracle via SQLAlchemy); (9) parallel comparison using concurrent.futures for faster execution on large tables; (10) a GitHub Actions workflow running validation automatically after migration scripts complete.'
      },
      {
        id: 'pre-post-reconciliation',
        name: 'Pre/Post Migration Reconciliation Pack',
        description: 'Baseline capture before migration and automated comparison after, with sign-off evidence generation.',
        type: 'framework',
        prompt: 'Build a pre/post migration reconciliation framework. Include: (1) pre-migration baseline capture script (extract counts, checksums, key metrics, and sample records from all critical tables to a baseline JSON file); (2) post-migration comparison script (load baseline JSON, re-query target system, compare and flag deviations); (3) configurable criticality tiers (tier 1 = zero tolerance, tier 2 = within 0.1% tolerance, tier 3 = informational); (4) reconciliation dashboard HTML (total tables checked, pass/warn/fail counts, drill-down table with row-level diff viewer); (5) evidence package generator (ZIP with reconciliation report, baseline snapshot, comparison results, timestamp) for audit purposes; (6) delta-detection for incremental migrations (identify net-new records in source since baseline capture); (7) a scheduling utility for automated nightly reconciliation during hypercare period post-migration. Include configuration YAML and README.'
      },
      {
        id: 'flyway-schema-migration-tests',
        name: 'Flyway Schema Migration Test Suite',
        description: 'Automated tests verifying Flyway migration scripts apply cleanly, roll back correctly, and preserve data integrity.',
        type: 'framework',
        prompt: 'Build a Flyway database schema migration test suite. Include: (1) Testcontainers-based PostgreSQL setup for isolated migration testing in CI; (2) forward migration tests (apply all pending Flyway scripts, verify final schema matches expected structure using information_schema queries); (3) idempotency tests (verify migrations can be re-run without error on up-to-date schema); (4) rollback tests (where Flyway undo scripts exist, test undo applies cleanly and schema reverts); (5) data preservation tests (insert seed data before migration, verify data survives migration without corruption); (6) migration conflict detection (verify no two migration scripts have the same version number); (7) schema version assertion (flyway_schema_history table has expected version after all migrations); (8) integration with existing pgTAP tests post-migration; (9) a GitHub Actions workflow that runs the full suite on every PR modifying migration scripts. Use JUnit 5 + Flyway Java API or pytest + python-on-whales.'
      },
      {
        id: 'erp-conversion-pack',
        name: 'ERP/CRM Data Conversion Test Pack',
        description: 'Business-oriented acceptance test pack for ERP and CRM migration projects covering master data and transactions.',
        type: 'playbook',
        prompt: 'Create a data conversion test pack for an ERP or CRM migration project. Include: (1) conversion object inventory (master data: customers, vendors, items, accounts; transaction data: open orders, invoices, balances, history); (2) conversion rule test cases per object (extract rule, transform mapping, load validation — with given/when/then format); (3) business acceptance test scenarios (customer credit limit preserved, vendor payment terms mapped, open invoice balance matches source); (4) data quality gate thresholds (completeness %, accuracy %, referential integrity %, duplicates % — pass/fail thresholds per tier); (5) conversion exception handling test cases (how truncated fields, unmapped codes, and null values are handled); (6) parallel run verification approach (new system vs legacy system producing same outputs for same inputs); (7) cutover validation checklist (last extract confirmed, all objects loaded, counts match, key test scenarios passed, business sign-off). Produce as structured Markdown with tables.'
      },
      {
        id: 'rollback-verification-plan',
        name: 'Migration Rollback Verification Plan',
        description: 'Structured plan for testing rollback procedures before migration cutover to ensure safe recovery.',
        type: 'playbook',
        prompt: 'Generate a migration rollback verification plan. Include: (1) rollback trigger criteria (what conditions require activating rollback: X% data validation failures, Y critical test failures, RTO exceeded, business decision); (2) rollback procedure steps for each migration phase (pre-cutover rollback, cutover rollback, post-cutover rollback); (3) rollback test scenarios to execute before go-live (simulate each trigger condition, execute rollback, verify system returns to pre-migration state); (4) rollback test evidence checklist (data counts restored, schema reverted, application connectivity to legacy system verified, user acceptance of rollback state); (5) rollback time measurement log (target rollback RTO, actual rollback duration per rehearsal, trend); (6) communication plan for rollback event (who notifies whom, messaging templates, escalation chain); (7) post-rollback stability verification checklist (business-critical processes verified working, no data loss confirmed, incident ticket raised). Produce as structured Markdown.'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // 31. Enterprise System Integration Testing
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
  {
    id: 'enterprise-integration-testing',
    name: 'Enterprise System Integration Testing',
    description: 'Cross-system validation, batch/file integration frameworks, ERP interoperability plans, and end-to-end business process packs.',
    icon: 'Network',
    category: 'enterprise-integration',
    collection: 'specialized-systems',
    domains: [
      'Banking & Finance', 'Healthcare', 'Government & Public Sector', 'ERP / CRM Platforms',
      'Insurance', 'Telecom', 'Logistics & Supply Chain', 'Manufacturing'
    ],
    subTemplates: [
      {
        id: 'cross-system-api-tests',
        name: 'Cross-System API Dependency Test Framework',
        description: 'End-to-end API test suites that traverse multiple integrated systems and validate data consistency across boundaries.',
        type: 'framework',
        prompt: 'Build a cross-system API integration test framework using Python (pytest + httpx) or TypeScript (Playwright API / supertest). Include: (1) a multi-system configuration model (base URLs, auth tokens, environment per system — CRM, ERP, billing, notification); (2) orchestrated test scenarios that call System A → verify state in System B (e.g. create customer in CRM → verify synced to ERP, raise invoice in ERP → verify payment event in billing system → verify email sent by notification service); (3) correlation ID propagation assertions (same trace ID flows through all systems); (4) data consistency helper utilities (poll-until-match with configurable timeout for async propagation); (5) rollback/cleanup fixtures that undo test data across all systems; (6) contract validation layer (response schema assertions per system); (7) parallel test execution with system-level rate limiting; (8) integration test report with per-system call breakdown and latency stats; (9) a GitHub Actions workflow requiring all system health checks to pass before running.'
      },
      {
        id: 'batch-file-integration-framework',
        name: 'Batch & File-Based Integration Testing Framework',
        description: 'Automated testing of file-based interfaces, SFTP feeds, EDI exchanges, and batch job outputs.',
        type: 'framework',
        prompt: 'Build an automated testing framework for batch and file-based integrations. Include: (1) file generation utilities (produce synthetic CSV, fixed-width, XML, JSON, and EDI X12/EDIFACT test files from configurable templates); (2) SFTP delivery and pickup test harness (Testcontainers SFTP server, upload test file, trigger downstream process, verify file consumed and archived); (3) file format validation assertions (column count, header presence, field data types, required field non-null, row count range); (4) batch output reconciliation (compare expected output file against actual — row by row with configurable tolerance); (5) error file inspection (check reject/error files generated for invalid records, verify rejection reason codes correct); (6) scheduling and trigger tests (verify batch runs at expected time, verify dependency-triggered jobs run after upstream completes); (7) batch idempotency tests (re-run same input file, verify no duplicate records in target); (8) end-to-end timing assertions (file arrival to output generation within SLA). Include pytest test suite and detailed README.'
      },
      {
        id: 'erp-integration-plan',
        name: 'ERP/CRM Integration Test Strategy',
        description: 'End-to-end integration test strategy for ERP/CRM system connections covering processes, data flows, and sign-off.',
        type: 'playbook',
        prompt: 'Create an ERP/CRM integration test strategy document. Include: (1) integration landscape diagram description (systems involved, data flow direction, interface type — REST API, SFTP, message queue, database link, EDI); (2) integration test scope (in-scope integrations, explicitly out-of-scope, manual vs automated per interface); (3) integration test scenarios for 5 key business processes (customer onboarding, order-to-cash, procure-to-pay, inventory sync, invoice reconciliation) — each with given/when/then format and data dependency notes; (4) test data strategy (pre-conditions per system, how to create valid test master data, how to reset between tests); (5) environment requirements (which environments are needed for full end-to-end, what mocks/stubs are acceptable for which systems, who owns each system access); (6) defect ownership matrix (when a defect is found at an integration boundary, which team owns triage and fix); (7) integration test sign-off criteria and evidence pack format. Produce as structured Markdown.'
      },
      {
        id: 'third-party-dependency-verification',
        name: 'Third-Party Dependency Verification Pack',
        description: 'Test pack for validating external provider integrations, SLAs, fallbacks, and contractual obligations.',
        type: 'playbook',
        prompt: 'Generate a third-party dependency verification pack for a system with multiple external integrations. Include: (1) third-party dependency register (provider name, service, criticality tier, SLA uptime%, response time SLA, data contract format, support contact, fallback strategy); (2) integration health check test cases per provider (connectivity test, authentication test, basic functional call test, response schema assertion); (3) SLA compliance verification approach (how to measure and report uptime and latency compliance against agreed SLA targets); (4) fallback testing scenarios (what happens when provider is slow, returns errors, or is completely unreachable — test each) with expected degraded-mode behaviour; (5) data contract change detection (how the team detects when a third-party API response schema changes unexpectedly); (6) provider sandbox vs production data handling guidance; (7) vendor SLA breach escalation procedure and communication template. Produce as structured Markdown with tables.'
      },
      {
        id: 'e2e-business-process-pack',
        name: 'End-to-End Business Process Test Pack',
        description: 'Stakeholder-ready test pack for validating complete business process flows across all integrated systems.',
        type: 'playbook',
        prompt: 'Create an end-to-end business process test pack covering critical workflows across multiple integrated systems. Include: (1) business process catalogue (list of processes in scope, owning business team, criticality, test frequency); (2) detailed test scenarios for 4 end-to-end processes (each spanning ≥3 integrated systems): (a) customer registration to first order completion, (b) bulk data import to downstream report generation, (c) payment failure to customer notification to refund, (d) inventory depletion to reorder to supplier acknowledgement; (3) each scenario documented with: preconditions, step-by-step actions across systems, expected system state per step, data to verify, and pass/fail criteria; (4) test execution log template (scenario, executor, date, result, defects raised); (5) cross-system data traceability table (transaction ID flow from system to system); (6) business process owner sign-off section; (7) known limitations and manual verification steps that cannot be automated. Produce as structured Markdown with clear tables.'
      }
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────── 
  // 32. SAP Testing
  // ─────────────────────────────────────────────────────────────────────────── 
  {
    id: 'sap-testing',
    name: 'SAP Application Testing',
    description: 'End-to-end testing for SAP ERP, S/4HANA, Fiori, and BTP using eCATT, CBTA, and Robot Framework.',
    icon: 'Building2',
    category: 'enterprise-integration',
    collection: 'specialized-systems',
    domains: [
      'SAP ERP / ECC', 'SAP S/4HANA', 'SAP Fiori / UI5', 'SAP BTP',
      'Finance & Controlling (FI/CO)', 'Supply Chain (MM/WM/SD)', 'HR / SuccessFactors',
      'SAP BW/4HANA', 'SAP Integration Suite'
    ],
    subTemplates: [
      {
        id: 'ecatt-cbta-testing',
        name: 'eCATT / CBTA SAP GUI Automation',
        description: 'SAP-native test automation with eCATT scripts and Component-Based Test Automation (CBTA).',
        prompt: 'Build an SAP GUI and Fiori test automation framework using eCATT (Extended Computer Aided Test Tool) and Wricef CBTA (SAP Solution Manager). Include: (1) eCATT test scripts for core SAP transactions — create customer (XD01), create sales order (VA01), post goods issue (VL02N), post invoice (VF01), financial posting (FB50); (2) CBTA component library — business components encapsulating reusable SAP screen interactions; (3) Test configuration with variant data tables for data-driven test runs; (4) System-to-System (S2S) eCATT scripts for integration tests across SAP and non-SAP systems; (5) CBTA test plan and test package organisation in SAP Solution Manager; (6) Logical component group and test configuration parameterisation; (7) Negative test scenarios — duplicate document creation, missing mandatory field, authorization object failure; (8) Test execution via Solution Manager Test Suite with result tracking; (9) Automated regression suite scheduled via CBTA test plan activation; (10) HTML and Solution Manager-native test result reporting; (11) ABAP Unit test framework for custom ABAP code validation; (12) Transport request validation tests — assert ABAP development objects transport correctly between systems. Include eCATT script examples and CBTA component catalogue.'
      },
      {
        id: 'sap-fiori-ui5-testing',
        name: 'SAP Fiori / SAPUI5 End-to-End Testing',
        description: 'OPA5 integration tests, UIVeri5 E2E tests, and Wdi5 WebdriverIO tests for Fiori apps.',
        prompt: 'Build an SAP Fiori and SAPUI5 testing framework using OPA5, Wdi5 (SAPUI5 WebdriverIO plugin), and UIVeri5. Include: (1) OPA5 (One Page Acceptance) integration tests — test UI5 controls using Given/When/Then pattern, waitFor to interact with SmartTable, SmartForm, Button, Input controls; (2) OPA5 actions and assertions for ListReportPage and ObjectPage Fiori elements; (3) Mock server setup for OPA5 tests using sap.ui.core.util.MockServer (serve OData responses from JSON fixture files); (4) Wdi5 E2E tests using WebdriverIO — browser-level testing of Fiori Launchpad navigation, tile clicks, app transitions; (5) UIVeri5 page objects for Fiori Elements patterns (ListReport, ObjectPage, AnalyticalListPage); (6) OData V4 service validation tests — assert correct OData requests sent to backend with expected filter and expand parameters; (7) Accessibility tests for Fiori apps using ARIA landmark assertions and keyboard navigation tests; (8) Performance tests — Fiori app initial load time within SAP standard thresholds; (9) Cross-browser testing for Fiori (Chrome, Edge, Safari) via Selenium Grid; (10) Fiori Launchpad tile permission tests — assert only authorised tiles visible per role; (11) npm/Karma test setup for OPA5; (12) GitHub Actions pipeline packing UI5 app and running Wdi5 tests. Include unit test examples and OPA5 journey files.'
      },
      {
        id: 'sap-btp-integration-testing',
        name: 'SAP BTP Integration Suite Testing',
        description: 'Integration flow, API Management, and Event Mesh tests for SAP Business Technology Platform.',
        prompt: 'Build an SAP BTP testing framework covering Integration Suite, API Management, and Event Mesh. Include: (1) Integration Flow (iFlow) tests — trigger iFlow via CPI HTTP sender adapter using REST API, assert message delivered to receiver system, assert message mapping transformed payload correctly; (2) Integration flow error handling tests — send malformed payload, assert error is caught, routed to dead-letter queue, and alert sent; (3) CPI Script step tests for Groovy/JavaScript scripts — unit test Groovy transformations using JUnit with mocked MessageHeader and MessageBody; (4) API Management proxy tests — assert API policy execution (quota, rate limit, authentication, request/response transformation); (5) API Management product and plan tests — assert correct API key grants access, revoked key returns 401; (6) Event Mesh topic subscription tests — publish event to topic, assert BTP Event Mesh consumer receives and routes event; (7) BTP Destination configuration tests — assert named destinations resolve to correct host and return expected data; (8) SAP Integration Advisor mapping tests — B2B message mapping (EDI to IDoc), assert expected XML output; (9) PAPI (BTP Cloud Foundry services) provisioning tests; (10) Multi-system end-to-end integration tests (S/4HANA to CRM via BTP Integration Suite); (11) Performance tests for iFlow throughput; (12) GitHub Actions deploying iFlow artifacts to BTP trial and running tests. Include Postman/Bruno collection and Groovy unit test examples.'
      },
      {
        id: 'sap-s4hana-regression',
        name: 'SAP S/4HANA Regression Testing Pack',
        description: 'Cross-module regression test pack for S/4HANA upgrade and migration validation.',
        prompt: 'Build a SAP S/4HANA regression testing framework for upgrade and migration validation using Robot Framework with SikuliX and SAP GUI libraries. Include: (1) Robot Framework test suites organised by S/4HANA module: FI (GL posting, AP invoice, AR payment), CO (cost center allocation, profitability analysis), MM (purchase order, goods receipt, invoice verification), SD (quotation to cash cycle), HR (payroll calculation, absence posting); (2) SAP GUI connection with RPA Framework (robocorp/robotframework-sapguilibrary) — open SAP connection, log in with test user, navigate transactions; (3) S/4HANA Fiori test cases for analytical apps (embedded BW queries, standard reports); (4) Custom ABAP object regression tests using ABAP Unit; (5) Business process end-to-end tests spanning multiple modules (procure-to-pay, order-to-cash, record-to-report); (6) Master data integrity tests (customer, vendor, material, cost center hierarchy); (7) Authorization concept tests — assert users can only access transactions for their assigned roles; (8) Performance regression tests — compare critical transaction response times before and after upgrade; (9) Data migration validation tests (table-level row count and key field reconciliation pre/post migration); (10) BPCA (Business Process Change Analyzer) integration — import BPCA-identified impacted processes as test scope; (11) Jenkins pipeline with SAP system connectivity. Include Robot Framework resource files and test data CSV.'
      },
      {
        id: 'sap-successfactors-testing',
        name: 'SAP SuccessFactors HCM Testing',
        description: 'API-driven, OData, and UI automation tests for SAP SuccessFactors modules.',
        prompt: 'Build an SAP SuccessFactors HCM testing framework using Python, pytest, and Playwright. Include: (1) SuccessFactors OData API V2 tests using requests — CRUD operations on Employee, Job, Compensation, Learning objects; (2) Foundation Object tests — create/update/read business unit, department, job classification via SF OData; (3) Employee Central core transaction tests — new hire action, job change, termination, position management via API; (4) SuccessFactors OAuth2 SAML 2.0 Bearer Assertion token flow for API authentication; (5) Intelligent Services Center (ISC) event subscription tests — trigger EC event, assert downstream integration event fired; (6) Learning Management System (LMS) course assignment and completion API tests; (7) Performance Management module API tests — goal creation, mid-year review submission, PM form routing; (8) Playwright UI tests for People Profile, Org Chart, Employee Self-Service portal; (9) Localization tests — assert country-specific fields (tax forms, absence types, legal entity) present for each locale; (10) Employee Central Payroll integration tests — assert payroll data flows from EC to ECP; (11) SuccessFactors Report query API tests (Ad-hoc report, Compound Employee API); (12) GitHub Actions with SF sandbox connectivity. Include pytest conftest.py with SF OAuth helper and sample test data.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────── 
  // 33. Salesforce Testing
  // ─────────────────────────────────────────────────────────────────────────── 
  {
    id: 'salesforce-testing',
    name: 'Salesforce Application Testing',
    description: 'Apex unit tests, Flow testing, Lightning Web Components, and Salesforce DX CI/CD pipelines.',
    icon: 'Cloud',
    category: 'enterprise-integration',
    collection: 'specialized-systems',
    domains: [
      'Salesforce CRM', 'Sales Cloud', 'Service Cloud', 'Marketing Cloud',
      'Commerce Cloud', 'Experience Cloud', 'Apex Development', 'Lightning Web Components',
      'Salesforce Flows / Process Builder', 'Integrations (REST/SOAP APIs)'
    ],
    subTemplates: [
      {
        id: 'apex-unit-testing',
        name: 'Apex Unit Testing with Test Data Factory',
        description: 'Salesforce Apex unit and integration tests using Test Data Factory pattern and ApexMocks.',
        prompt: 'Build a Salesforce Apex unit testing framework. Include: (1) Test Data Factory class (TestDataFactory.createAccount, createContact, createOpportunity, createCase) providing SObjects with all required fields populated for any profile; (2) @IsTest class organisation — one test class per Apex class, @TestSetup for shared data, @isTest(SeeAllData=false) enforcement; (3) System.assertEquals/assertNotEquals/assert/assertThrows assertions; (4) Bulkification tests — process 200+ records in a single Apex invocation, assert no SOQL/DML governor limit exceptions; (5) ApexMocks framework (Mockito-style) — mock Salesforce Platform APIs (HTTP callouts, Email Service) with fflib_ApexMocks; (6) Enterprise Application Architecture (fflib) layered testing — Domain, Service, Selector, Application layer unit tests; (7) SOSL and SOQL mock query results with Test.setFixedSearchResults() and selector mocks; (8) Asynchronous Apex tests — test @Future methods, Queueable, Schedulable, and Batch Apex in Test.startTest()/stopTest() blocks; (9) Exception handling tests — assert correct AuraHandledException thrown for invalid inputs; (10) Platform Event publish/subscribe tests; (11) Code coverage reporting via sfdx force:apex:test:run --code-coverage; (12) GitHub Actions Salesforce CI with sfdx auth. Include TestDataFactory.cls and sample Apex test class.'
      },
      {
        id: 'salesforce-flow-testing',
        name: 'Salesforce Flow & Process Automation Testing',
        description: 'Automated tests for Screen Flows, Record-Triggered Flows, and Scheduled Paths.',
        prompt: 'Build a Salesforce Flow testing framework using Apex test classes and Flow Interview API. Include: (1) Screen Flow unit tests using Flow.Interview.createInterview() — set input variables, start interview, assert output variable values; (2) Record-Triggered Flow tests — create/update/delete triggering record via DML in @IsTest, assert Flow side effects (record updates, child record creation, platform event firing); (3) Scheduled Path tests — use Test.setCreatedDate and Test.Env() to simulate time advancement triggers; (4) Sub-flow call tests — assert parent flow calls sub-flow with correct inputs and receives expected outputs; (5) Flow error handling tests — assert flow correctly handles faults and routes to fault path; (6) Decision element test coverage — create test data satisfying each decision branch; (7) Loop element tests — assert loop iterates correct number of times with expected per-iteration outputs; (8) Get/Create/Update/Delete Records element tests — assert correct SOQL query issued and DML committed; (9) Flows interacting with external services (HTTP callout via invocable action) — mock callout in Test context; (10) FlowTestBuilder open-source utility integration for rapid flow test scaffolding; (11) Apex PMD static analysis of Flow test classes; (12) Automated flow metadata XML validation. Include sample flow test examples and TestDataFactory extensions.'
      },
      {
        id: 'lwc-jest-testing',
        name: 'Lightning Web Components (LWC) Jest Testing',
        description: 'Component unit tests for LWC using @salesforce/wire mocks and Lightning Data Service stubs.',
        prompt: 'Build a Lightning Web Components (LWC) unit testing framework using Jest and @salesforce/community-tools. Include: (1) LWC Jest test setup with @salesforce/jest-config and jest-mock-lwc; (2) Component rendering tests — createElement, set public properties, query shadow DOM elements, assert innerHTML; (3) Event dispatching tests — dispatch CustomEvent from child, assert parent event handler called with correct detail; (4) Wire adapter mocking — mock @wire(getRecord), @wire(getObjectInfo), @wire(MessageService) with registerLdsTestWireAdapter and emit({ data, error }); (5) Apex method call mocking — mock @wire(getRelatedListRecords) and imperative Apex method (jest.mock approved approach); (6) Lightning Message Service (LMS) subscriber tests — publish message from test, assert component handles payload; (7) LWC navigation tests — mock NavigationMixin, assert navigate called with correct PageReference; (8) Form validation tests — fill inputs, submit form, assert validation messages visible; (9) Slot content and composition tests; (10) Accessibility tests using @webcomponents/polyfills and jest-axe; (11) npm test with --coverage and threshold enforcement; (12) GitHub Actions LWC test pipeline. Include jest.config.js, __mocks__ folder structure, and sample component test.'
      },
      {
        id: 'salesforce-dx-cicd',
        name: 'Salesforce DX — Full CI/CD Testing Pipeline',
        description: 'sfdx source deployment, scratch org testing, packaging, and release validation pipeline.',
        prompt: 'Build a complete Salesforce DX CI/CD testing pipeline using sfdx, GitHub Actions, and CumulusCI. Include: (1) Scratch org creation and source deployment pipeline — sfdx force:org:create, sfdx force:source:push, run Apex tests, run LWC Jest tests, delete scratch org; (2) CumulusCI flow for automated environment setup — robotframework test execution on scratch org; (3) Unlocked Package version promotion pipeline — create package version, install in QA sandbox, run full test suite, promote on passing; (4) Second-generation package dependency resolution tests; (5) Scratch org snapshot tests (create org from snapshot, deploy delta changes, run tests); (6) Profile and Permission Set deployment validation tests; (7) Destructive change validation — process destructiveChanges.xml, assert all deleted components have no existing dependencies; (8) Robot Framework Salesforce UI tests using SeleniumLibrary against full sandbox; (9) Static code analysis with Apex PMD and ESLint (LWC) — fail pipeline on violations above severity threshold; (10) Automated sandox refresh and seeding pipeline (sfdx force:data:tree:import); (11) Environment variable management with GitHub Secrets and sfdx auth URL; (12) Slack notification on pipeline success/failure. Include sfdx-project.json and GitHub Actions workflow YAML.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────── 
  // 34. Mainframe & COBOL Testing
  // ─────────────────────────────────────────────────────────────────────────── 
  {
    id: 'mainframe-testing',
    name: 'Mainframe & COBOL Testing',
    description: 'COBOL unit tests, JCL batch job validation, CICS transaction tests, and z/OS modernization testing.',
    icon: 'Server',
    category: 'enterprise-integration',
    collection: 'specialized-systems',
    domains: [
      'IBM z/OS', 'COBOL', 'JCL Batch Processing', 'CICS', 'IMS DB',
      'VSAM / QSAM File I/O', 'DB2 for z/OS', 'MQ for z/OS', 'z/OS Connect EE'
    ],
    subTemplates: [
      {
        id: 'cobol-unit-testing',
        name: 'COBOL Unit Testing (ZUNIT / Cobol Check)',
        description: 'Unit tests for COBOL modules using Broadcom ZUNIT and open-source Cobol Check framework.',
        prompt: 'Build a COBOL unit testing framework using Broadcom ZUNIT (IBM Developer for z/OS plugin) and Cobol Check. Include: (1) ZUNIT test case structure — TEST-CASE, MOCK-SECTION, EXPECTED-DATA, ASSERT paragraphs for testing individual COBOL paragraphs in isolation; (2) Cobol Check test scripts (.cut files) — TESTSUITE, TESTCASE, MOCK, VERIFY HAPPENED ONCE, EXPECT directives for open-source COBOL unit testing; (3) COBOL paragraph isolation — mock CALL statements to external programs, mock EXEC CICS commands, mock file I/O; (4) Data structure tests — populate Working Storage variables, invoke business logic paragraph, assert Procedure Division output in Working Storage; (5) Condition name (88-level) tests — assert correct 88-level condition set based on input data; (6) Arithmetic precision tests — fixed-point COMP-3 decimal arithmetic assertions; (7) String manipulation tests — INSPECT, STRING, UNSTRING operations with expected output; (8) Error handling tests — assert FILE STATUS code set correctly on I/O error; (9) Batch regression: submit JCL job running COBOL program with test input file, assert output file content; (10) Cobol Check CI integration with Maven or Gradle runner; (11) CI/CD with Zowe CLI for remote job submission; (12) VS Code COBOL plugin development setup. Include Cobol Check .cut test examples and JCL templates.'
      },
      {
        id: 'jcl-batch-testing',
        name: 'JCL Batch Job Testing (Broadcom Topaz / Zowe)',
        description: 'JCL step-level validation, return code assertion, and dataset comparison for batch job streams.',
        prompt: 'Build a JCL batch job testing framework using Zowe CLI, Broadcom Topaz, and Python. Include: (1) Zowe CLI job submission — zowe jobs submit localfile batch.jcl, wait for completion, assert MAXCC return code equals expected value; (2) JCL step-level return code assertion — parse job spool output, assert each step COND CODE; (3) Dataset comparison tests — after batch job runs, compare output sequential dataset (PS) or PDS member against expected golden file record-by-record; (4) VSAM file validation — read output VSAM KSDS/ESDS keys and data, assert correct records written by batch; (5) DB2 table validation after batch — assert expected rows inserted/updated by DSNREXX or SPUFI queries via Zowe; (6) JCL parameter substitution tests — run JCL with different symbolic parameter values, assert outputs differ correctly; (7) Job scheduling dependency tests — simulate upstream job completion, assert downstream job triggered; (8) ABEND (abnormal end) tests — inject error condition, assert correct ABEND code and cleanup job triggered; (9) SORT and MERGE step output validation — compare DFSORT/SyncSort output against expected sorted dataset; (10) GDG (Generation Data Group) version management tests — assert new GDG generation created and previous generation accessible; (11) Batch performance regression tests — assert job wall-clock time within SLA; (12) GitHub Actions with Zowe CLI and z/OSMF connectivity. Include Python Zowe wrapper and test JCL templates.'
      },
      {
        id: 'cics-transaction-testing',
        name: 'CICS Transaction & API Testing',
        description: 'CICS transaction functional tests and z/OS Connect EE REST API wrapper validation.',
        prompt: 'Build a CICS transaction testing framework covering CICS programs, BMS maps, and z/OS Connect EE REST APIs. Include: (1) CICS Web Services tests — invoke CICS SOAP web service, assert response XML matches expected; (2) z/OS Connect EE REST API tests — call z/OS Connect-wrapped CICS transaction via HTTP, assert JSON response mapped from COBOL data structures correctly (including EBCDIC/ASCII conversion, packed decimal to integer mapping); (3) CICS container-based program tests — build container channel, EXEC CICS PUT CONTAINER, call CICS program via EXEC CICS LINK, assert output container contents; (4) CICS MQ bridge tests — put message to MQ queue, CICS picks up and processes, assert output in response queue or VSAM; (5) BMS map test stubs — simulate terminal interaction with BMS map, assert correct field values and cursor position; (6) CICS DB2 program tests — assert EXEC SQL statements issued correctly by CICS program (via CICS test stubs); (7) CICS resource definition tests — verify PROGRAM, TRANSACTION, FILE resource definitions match expected specifications using CICS INQUIRE commands; (8) Transaction performance tests — measure CICS transaction response time under load using performance monitoring API; (9) CICS security tests — assert only authorised users can invoke protected CICS transactions; (10) CICS region restart recovery tests — assert in-flight transactions correctly rolled back after region restart; (11) Python requests tests against z/OS Connect EE endpoints; (12) GitHub Actions with VPN connectivity to z/OS Connect EE. Include z/OS Connect API definition (YAML) and request examples.'
      }
    ]
  }
];
