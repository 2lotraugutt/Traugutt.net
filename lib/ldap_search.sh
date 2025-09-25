#!/bin/sh
set -e

LDAP_URL=ldap://10.10.1.2

# Ensure necessary arguments are provided
if [ $# -ne 2 ]; then
  echo "Usage: $0 <login> <password>"
  exit 1
fi

LOGIN="$1"
PASSWORD="$2"
BASE_DN="DC=traugutt,DC=lan"
SEARCH_FILTER="(userPrincipalName=${LOGIN})"

ldapsearch -x -H "$LDAP_URL" \
	 -D "$LOGIN" -w "$PASSWORD" \
	 -b "$BASE_DN" -LLL "$SEARCH_FILTER" -d 1 \
	| grep '^dn:' | head -n 1
