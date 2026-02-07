# UI Mockup Prompts for Portfolio Cases
**Total: 56 prompts for 12 cases**

> **Instructions:**
> 1. Copy each prompt into Midjourney or DALL-E
> 2. Save generated images with the filename specified (e.g., `web3_dex_swap.png`)
> 3. Place all images in `public/images/gallery/`
> 4. Once done, let me know and I'll integrate them into the website

---

## Style Prefix (Add to ALL prompts):
```
Professional dark mode UI design, Figma quality, 8px grid system, Inter font.
Color palette: #0a0a0f background, #6366f1 indigo accent, #22c55e success, #ef4444 error.
Glassmorphism cards, subtle borders, proper spacing.
Clean, minimal, enterprise-grade aesthetic. No device frames, no hands, no people.
```

---

## Case 1: Web3 L1 DEX

### 1.1 `web3_dex_swap.png` ✅ (Already generated)

### 1.2 `web3_dex_liquidity.png`
```
Liquidity pool dashboard. Pool list table with columns: Pool (ETH/USDC, BTC/ETH icons), TVL ($12.5M, $8.2M), APY (8.2%, 5.4%), 24h Volume. User positions section showing "Your Liquidity" with balance cards. Add/Remove liquidity buttons. Dark theme, glassmorphism.
```

### 1.3 `web3_dex_add_liquidity.png`
```
Add liquidity modal. Title "Add Liquidity", two token input sections with ETH and USDC selectors, balance displays, amount inputs. Pool share preview showing "Your share: 0.12%". Price ratio display. "Approve USDC" button above "Add Liquidity" gradient button. Slippage setting.
```

### 1.4 `web3_dex_wallet_connect.png`
```
Wallet connection modal overlay. Title "Connect Wallet". Grid of 6 wallet provider buttons: MetaMask (fox), WalletConnect (blue), Coinbase Wallet, Rabby, Trust Wallet, Ledger. Each is glassmorphic card with icon and name. Close X top right. Subtle backdrop blur.
```

### 1.5 `web3_dex_tx_history.png`
```
Transaction history table. Columns: Type, Tokens (with icons), Amount, USD Value, Status, Time. Sample rows: "Swap ETH→USDC, 2.5 ETH, $8,114, Confirmed ✓, 2m ago". Green confirmed badge, yellow pending. Pagination footer. Sortable headers.
```

---

## Case 2: Utility Token UAE

### 2.1 `token_uae_dashboard.png`
```
Token holder dashboard. Large balance card showing "12,450 AQAR" with USD value. Tier status card "Gold Member" with crown icon and benefits list (15% discount, early access, priority support). Staking status showing locked amount. Transaction history preview.
```

### 2.2 `token_uae_staking.png`
```
Staking interface. "Lock Tokens" title. Amount input with MAX button. Duration selector buttons: 30 days, 90 days, 180 days, 1 year. Benefits preview panel showing tier unlock at each duration. Lock button. Current staking stats sidebar.
```

### 2.3 `token_uae_admin_tiers.png`
```
Admin panel tier management. Three tier cards in row: Bronze, Silver, Gold. Each shows discount %, required balance, edit button. Add new tier button. Sidebar with tier statistics chart. Clean data table of all tiers below.
```

### 2.4 `token_uae_admin_analytics.png`
```
Admin analytics dashboard. Line chart "Holders Growth" over 30 days. Bar chart "Transactions by Type". Pie chart "Tier Distribution". KPI cards: Total Holders (2,450), Tokens Staked (8.2M), Avg Balance (5,100). Date range selector top right.
```

### 2.5 `token_uae_pos.png`
```
POS checkout screen with token payment. Product list totaling $125.50. Payment method selector with "Pay with AQAR" highlighted. QR code for wallet scan. Applied discount "-15% Member Discount". Confirm payment button. Professional retail terminal UI.
```

---

## Case 3: Enterprise Modules (KYC/Dashboard)

### 3.1 `enterprise_kyc_upload.png`
```
KYC document upload flow. Horizontal progress stepper: 1.Personal Info ✓, 2.Documents (active), 3.Verification, 4.Complete. Upload zone with drag-drop area. Document type selector: Passport, ID Card, Driver License. Preview of uploaded document. Continue button.
```

### 3.2 `enterprise_kyc_status.png`
```
KYC verification status page. Large status badge "In Review" with spinning indicator. Timeline showing: Submitted (done), Document Check (in progress), Identity Verification (pending), Approval (pending). Estimated time remaining. Contact support button.
```

### 3.3 `enterprise_investor_dashboard.png`
```
Investor dashboard. Allocation card showing "$50,000 Allocated" with vesting progress bar. Vesting schedule chart with unlock dates marked. Token balance available vs locked. Claim button for unlocked tokens. Transaction history of claims.
```

### 3.4 `enterprise_admin_users.png`
```
Admin user management table. Columns: Name, Email, KYC Status (badges: Approved green, Pending yellow, Rejected red), Investment, Actions. Filter buttons: All, Pending KYC, Approved. Search bar. Bulk actions dropdown. Pagination.
```

### 3.5 `enterprise_admin_audit.png`
```
Audit log timeline. Each entry shows: timestamp, actor (with avatar), action type badge, description, IP address. Filters: Date range, Action type, User. Export button. Entry details expand on click. Real timestamps and actions.
```

---

## Case 4: Geo/Heatmap Backend

### 4.1 `heatmap_live_map.png`
```
Interactive heatmap visualization. Dark map base with colored density overlay (blue to red spectrum). Density legend bottom left. Time slider for historical playback. Location markers for tracked venues. Zoom controls. Layer toggles sidebar.
```

### 4.2 `heatmap_analytics.png`
```
Location analytics dashboard. Line chart "Traffic by Hour" (24h). Bar chart comparing weekdays. Peak hours highlighted. KPI cards: Total Visits (45.2K), Avg Dwell Time (23min), Unique Visitors (12.8K). Location selector dropdown.
```

### 4.3 `heatmap_api_explorer.png`
```
API explorer interface. Left sidebar with endpoint tree: /locations, /heatmap, /analytics. Main area with request builder: method selector GET/POST, URL input, headers section, body editor. Response preview panel with JSON. Try it button.
```

### 4.4 `heatmap_rate_limiting.png`
```
API rate limiting dashboard. Usage meter showing 45,000/100,000 requests used. Daily breakdown chart. Quota reset countdown. Tier comparison table: Free, Pro, Enterprise with limits. Upgrade button CTA. Current plan highlighted.
```

---

## Case 5: Anti-refund Payment Flow

### 5.1 `payment_step1_terms.png`
```
Booking step 1 - terms acceptance. Clean card with service terms text. Two explicit checkboxes: "I understand this is a non-refundable deposit", "I agree to cancellation policy". Terms are clear, not tiny. Continue button disabled until checked.
```

### 5.2 `payment_step2_datetime.png`
```
Booking step 2 - date/time selection. Calendar month view with available dates highlighted. Time slots grid for selected date: 9:00, 10:00, 11:00, etc. Selected slot highlighted in indigo. Service summary sidebar. Back and Continue buttons.
```

### 5.3 `payment_step3_payment.png`
```
Booking step 3 - payment. "Secure Your Booking" title. Card input form with number, expiry, CVV. Deposit amount prominently shown "$50 Deposit". Legal text about deposit being deducted from final. Pay Now button. Security badges.
```

### 5.4 `payment_confirmation.png`
```
Booking confirmation screen. Success checkmark animation. "Booking Confirmed" title. Details card: Date, Time, Service, Deposit Paid. "Add to Calendar" button. Confirmation email sent notice. Cancellation policy reminder in small text.
```

### 5.5 `payment_admin_calendar.png`
```
Admin bookings calendar. Month view with bookings shown as colored blocks. Status legend: Confirmed (green), Pending (yellow), Cancelled (gray). Click booking to see details sidebar. Filter by status dropdown. Create booking button.
```

---

## Case 6: Wallet/RPC Compatibility

### 6.1 `wallet_compatibility_matrix.png`
```
Compatibility matrix table. Rows: Features (Connect, Sign, Send, Switch Chain, EIP-712). Columns: MetaMask, Rabby, WalletConnect, Coinbase, Trust. Cells show: ✓ green, ⚠ yellow partial, ✗ red. Footnotes explain partial support.
```

### 6.2 `wallet_rpc_test_suite.png`
```
RPC test suite dashboard. Test list with names: eth_chainId, eth_getBalance, eth_sendTransaction, etc. Each shows: status (pass ✓/fail ✗), response time (120ms), last run. Run All Tests button. Filter by status. Expandable logs.
```

### 6.3 `wallet_onboarding_wizard.png`
```
Wallet onboarding wizard. Step 1 of 4: "Select Wallet Type". Options: Browser Extension, Mobile Wallet, Hardware Wallet. Each with icon and description. Progress dots at bottom. Help link. Next button.
```

### 6.4 `wallet_error_diagnostics.png`
```
Error diagnostics panel. Error details: code, message, wallet type, chain ID. "Suggested Fix" section with actionable steps. Copy error button. Report issue link. Recent errors list sidebar. Search errors.
```

---

## Case 7: Release Quality Framework

### 7.1 `quality_pipeline_overview.png`
```
7-phase quality pipeline visualization. Horizontal flow: Build → Unit Tests → Integration → Security → Performance → Staging → Production. Each phase shows status icon (✓/⚠/waiting). Current phase highlighted. Overall progress bar.
```

### 7.2 `quality_gate_tests.png`
```
Test gate detail view. "Unit Tests" phase selected. Coverage gauge: 94%. Test results: 847 passed, 3 failed. Failed test list with expand for details. Re-run button. Mark as reviewed checkbox. Time taken: 4m 23s.
```

### 7.3 `quality_verification_report.png`
```
Verification report summary. Release version card. Phase-by-phase breakdown table: Phase, Status, Duration, Notes. Overall status: Ready for Production or Blocked. Sign-off buttons for stakeholders. Export PDF button.
```

### 7.4 `quality_override_workflow.png`
```
Gate override request form. "Request Override" title. Dropdown: Select gate to override. Reason textarea (required). Risk level selector: Low/Medium/High. Approver dropdown. Submit for Approval button. Override history below.
```

---

## Case 8: Startup Under Key (MVP Launch)

### 8.1 `startup_timeline.png`
```
Project timeline Gantt view. Phases: Discovery (2w), Design (3w), Development (8w), Testing (2w), Launch (1w). Milestones marked with diamonds. Today line. Dependencies shown as arrows. Phase progress filled.
```

### 8.2 `startup_deliverables.png`
```
Deliverables tracker. Checklist grouped by phase. Each item: checkbox, name, owner avatar, due date, status tag. Progress bar per phase. Overall completion: 68%. Filter: All, Pending, Completed. Export checklist.
```

### 8.3 `startup_support_dashboard.png`
```
Support ticket dashboard. Active tickets list with priority badges (Critical red, High orange, Normal blue). SLA timer on each showing remaining time. Ticket details panel. Quick reply buttons. Statistics sidebar.
```

### 8.4 `startup_ip_transfer.png`
```
IP transfer checklist. Document list: Source Code, Design Files, Documentation, Credentials, DNS Access. Each with checkboxes: Prepared, Reviewed, Transferred. Digital signature area. Completion percentage. Finalize Transfer button.
```

---

## Case 9: Asset Tokenization Platform

### 9.1 `asset_portfolio_dashboard.png`
```
Asset portfolio dashboard. Portfolio value card: $2.4M total. Asset cards grid: Real Estate (3 properties), Art (2 pieces), Commodities (1). Each shows value, yield %, 24h change. Performance chart. Diversification pie chart.
```

### 9.2 `asset_tokenization_form.png`
```
Asset tokenization flow - details step. Form: Asset Type dropdown, Name, Description, Location/Origin, Valuation, Supporting Documents upload area. Legal disclaimer checkbox. Preview on right side. Save Draft and Continue buttons.
```

### 9.3 `asset_investor_token_view.png`
```
Token detail page for investor. Token: "Manhattan Loft #127". Price chart with timeframes. Ownership: 2.5% (25 tokens). Dividend history table. Yield: 6.2% APY. Trade buttons: Buy More, Sell. Documents accordion.
```

### 9.4 `asset_secondary_market.png`
```
Secondary market trading screen. Order book: Bids (green) and Asks (red) with price and quantity. Price chart area. Trade form: Buy/Sell toggle, amount, limit/market. Your open orders list. Recent trades feed.
```

### 9.5 `asset_compliance_dashboard.png`
```
Compliance dashboard. Jurisdiction matrix table: US, EU, UAE, Singapore. Categories: Accreditation, Holding Limits, Reporting. Status badges. Document vault with compliance docs. Upcoming deadlines alerts.
```

---

## Case 10: Multi-Location Restaurant Management

### 10.1 `restaurant_hq_dashboard.png`
```
HQ overview dashboard. Map showing all 12 locations as pins with status colors. Revenue overview: $847K today, +12% vs yesterday. Alerts panel: 3 low inventory, 1 staff issue. Location performance leaderboard.
```

### 10.2 `restaurant_location_detail.png`
```
Single location dashboard. Today's metrics: Orders (234), Revenue ($12.4K), Avg Ticket ($53). Staff on shift list with roles. Active orders queue. Inventory alerts (3 items low). Quick actions bar.
```

### 10.3 `restaurant_menu_management.png`
```
Menu management interface. Category sidebar: Appetizers, Mains, Desserts, Drinks. Item cards in grid: photo, name, price, availability toggle. Edit item modal preview. Drag to reorder. Add Item button. Sync to POS button.
```

### 10.4 `restaurant_staff_scheduling.png`
```
Staff scheduling calendar. Week view with staff rows and day columns. Shift blocks color-coded by role (kitchen blue, front red, management purple). Drag to create shifts. Conflicts highlighted. Publish schedule button.
```

### 10.5 `restaurant_inventory.png`
```
Inventory tracker. Stock levels bar chart by category. Low stock alerts list with reorder buttons. Inventory table: Item, Current Stock, Min Level, Last Ordered, Supplier. Bulk reorder modal. Usage trends chart.
```

---

## Case 11: AI Accounting System

### 11.1 `accounting_transactions.png`
```
Transaction dashboard. Transaction list with: Date, Description, Amount, Auto-Category, AI Confidence (95%, 78%). Confidence bar colored. Review needed filter. Bulk categorize. Monthly summary cards above.
```

### 11.2 `accounting_document_scanner.png`
```
Document scanner interface. Upload zone for receipts/invoices. Preview of scanned document. OCR extracted data: Vendor, Amount, Date, Line Items table. Confidence indicators. Approve and Add button. Manual edit option.
```

### 11.3 `accounting_reconciliation.png`
```
Bank reconciliation view. Two columns: Bank Statement, Your Books. Line items with match suggestions connected by lines. Matched (green), Unmatched (yellow), Discrepancy (red). Auto-match button. Reconcile selected button.
```

### 11.4 `accounting_reports.png`
```
Report generator. Report type cards: P&L, Balance Sheet, Cash Flow, Tax Summary. Date range selector. Preview pane showing generated report. Export buttons: PDF, Excel, CSV. Schedule report option.
```

### 11.5 `accounting_ai_training.png`
```
AI training feedback interface. Recent AI categorizations list. Each shows: original category, your correction. "Learn from this" button. Category accuracy chart over time. Retrain model button. Training history log.
```

---

## Case 12: Analytics Pro (Enterprise BI)

### 12.1 `analytics_dashboard_builder.png`
```
Dashboard builder interface. Left: Widget library (Charts, Tables, KPIs, Text). Center: Canvas with drag-drop widgets. Right: Selected widget properties panel. Top toolbar: Save, Preview, Share. Grid snap enabled.
```

### 12.2 `analytics_data_connector.png`
```
Data source connection wizard. Source grid: PostgreSQL, MySQL, BigQuery, Snowflake, REST API, CSV. Each with logo. Connection form for selected source: host, port, credentials, test connection button. Connected sources sidebar.
```

### 12.3 `analytics_live_dashboard.png`
```
Live analytics dashboard. KPI cards row: Revenue ($1.2M), Users (45.2K), Conversion (3.2%), Churn (1.1%). Line chart: Daily Active Users. Bar chart: Revenue by Region. Data table: Top Products. Filter bar. Last updated timestamp.
```

### 12.4 `analytics_query_builder.png`
```
Query builder interface. SQL editor with syntax highlighting. Table/column browser sidebar. Query results table below. Visual query builder toggle. Save query modal. Execution time: 0.8s. Row count: 12,450.
```

### 12.5 `analytics_alerts.png`
```
Alerts and subscriptions panel. Alert rules list: "Revenue drops >20%", "New signups <100/day". Each shows: condition, threshold, notification channels (email, Slack icons). Create alert form. Subscription schedules for reports.
```

---

## Quick Reference: Filenames

| Case | Filename Pattern | Count |
|------|-----------------|-------|
| Web3 DEX | `web3_dex_*.png` | 5 |
| Token UAE | `token_uae_*.png` | 5 |
| Enterprise | `enterprise_*.png` | 5 |
| Heatmap | `heatmap_*.png` | 4 |
| Payment | `payment_*.png` | 5 |
| Wallet | `wallet_*.png` | 4 |
| Quality | `quality_*.png` | 4 |
| Startup | `startup_*.png` | 4 |
| Asset | `asset_*.png` | 5 |
| Restaurant | `restaurant_*.png` | 5 |
| Accounting | `accounting_*.png` | 5 |
| Analytics | `analytics_*.png` | 5 |
| **TOTAL** | | **56** |

---

**After generation, place all files in:**
```
public/images/gallery/
```

Then let me know and I'll integrate them into the website with the gallery component!
