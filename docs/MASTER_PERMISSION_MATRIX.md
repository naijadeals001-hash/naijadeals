# MASTER PERMISSION MATRIX

This document defines privileged operation governance for the NaijaDeals Super Ecosystem. If an action here is implemented later, the listed control requirements are mandatory.

| Privileged Action | Required Role | Approval Requirement | Maker-Checker Rule | Audit Logging | Notification Requirement | Emergency Override Rule |
| --- | --- | --- | --- | --- | --- | --- |
| Wallet Adjustments | Finance Admin or Super Admin with finance scope | Finance approver or Super Admin governance approval | Required | mandatory before/after state, reason, reference IDs | notify finance governance and affected support channel where policy requires | emergency allowed only under incident command; post-review mandatory |
| Escrow Release Override | Escrow Admin, Finance Admin, or Super Admin | second approver required | Required | mandatory, including case/dispute reference | notify support/finance/trust stakeholders and affected workflow queue | emergency allowed only for incident containment or legal/compliance action |
| Refund Approval | Finance Admin or Support Lead with refund approval permission | approval required above configured threshold; policy-bound for all manual refunds | Required above policy threshold | mandatory with order/payment reference | notify customer and finance/support audit recipients as required | emergency allowed only if customer harm or provider failure demands manual recovery |
| Merchant Suspension | Trust Admin, Compliance Admin, or Super Admin | approval required unless automated policy only issues temporary hold | Required for permanent suspension | mandatory with evidence bundle reference | notify trust/compliance/support and merchant communication workflow | emergency temporary hold allowed; permanent action requires follow-up approval |
| Driver Suspension | Operations Admin, Trust Admin, or Super Admin | approval required for non-automatic/manual suspension | Required for permanent suspension | mandatory with incident/trust reference | notify operations/support and affected driver communication workflow | emergency temporary hold allowed for safety risk; review required |
| Role Assignment | Super Admin or delegated RBAC Admin | approval required for elevated roles | Required for privileged roles | mandatory including granted scopes | notify governance/security recipients | emergency grant allowed only for incident response; expires by policy |
| Permission Changes | Super Admin or RBAC Admin | approval required | Required | mandatory with before/after permission diff | notify governance/security recipients | emergency override allowed only under incident command |
| AI Configuration Change | AI Admin or Super Admin | approval required for provider/model/policy/prompt changes affecting production | Required for sensitive AI capability | mandatory with model/prompt/policy version references | notify AI governance, security, and impacted domain owners | emergency disablement allowed; enabling risky change still requires approval |
| Environment Changes | Platform Admin or Super Admin | approval required for prod-intent change | Required | mandatory with env/config reference | notify platform/on-call/governance recipients | emergency change allowed only under incident process |
| API Key Rotation | Platform Admin or Security Admin | approval required for planned rotation; incident command for emergency rotation | Maker-checker recommended; mandatory for prod shared keys | mandatory with impacted services list | notify platform/security/on-call recipients | emergency rotation allowed; post-review mandatory |
| System Recovery | Platform Recovery Admin or Super Admin | approval required for restore/recovery execution except pre-authorized runbook automation | Required for restore or destructive recovery | mandatory with backup/restore scope and validation evidence | notify platform, security, finance/compliance as applicable | emergency allowed under disaster process |
| Emergency Access | Super Admin, Security Admin, or Incident Commander authorized delegate | incident authority required | N/A for activation; mandatory post-event review | mandatory with reason, duration, granted scope, review status | immediate notification to governance/security recipients | inherently emergency-only; auto-expiry required |
| Super Admin Policy Change | Super Admin | approval required for material policy changes | Required | mandatory with policy diff | notify governance/security/affected admins | emergency restriction allowed for containment; expansion requires approval |

## Control Rules

- “Required” means the action may not be completed by a single unchecked actor in normal operation.
- Temporary emergency controls may reduce time-to-approval but may not remove auditability.
- No privileged action may bypass the audit platform, approval evidence, or notification rules.
