#!/bin/bash
echo -e "=== 🟢 ПРИЙНЯТІ УЧАСНИКИ ===" && \
gh api repos/dvankevich/fd-web/collaborators \
  --jq '.[] | "\(.login) | Статус: Accepted | Роль: \(.role_name)"' && \
echo -e "\n=== 🟡 РОЗІСЛАНІ ЗАПРОШЕННЯ ===" && \
gh api repos/dvankevich/fd-web/invitations \
  --jq '.[] | "\(.invitee.login) | Статус: \(if .expired then "Expired" else "Pending" end) | Роль: \(.permissions)"'

