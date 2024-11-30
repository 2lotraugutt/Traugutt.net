#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Load the LDAP URL from .env file
LDAP_URL=ldaps://traugutt.lan:636

# Ensure necessary arguments are provided
if [ $# -ne 2 ]; then
  echo "Usage: $0 <login> <password>"
  exit 1
fi

# Command-line arguments
LOGIN="$1"
PASSWORD="$2"

# Hardcoded base DN
BASE_DN="DC=traugutt,DC=lan"

# User search filter
SEARCH_FILTER="(userPrincipalName=${LOGIN})"

# LDAP search command with debug option (-d 1 for verbose output)
RESULT=$(ldapsearch -x -H "$LDAP_URL" -D "$LOGIN" -w "$PASSWORD" -b "$BASE_DN" -LLL "$SEARCH_FILTER" -d 1)

# Extract the first line containing the 'dn' attribute
DN=$(echo "$RESULT" | grep "^dn:" | head -n 1)

# Output the 'dn' line
echo "$DN"