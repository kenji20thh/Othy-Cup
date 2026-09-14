package handlers

import "github.com/jackc/pgx/v5/pgxpool"

type AuthHandler struct {
	DB       *pgxpool.Pool
	Sessions *SessionStore
}
