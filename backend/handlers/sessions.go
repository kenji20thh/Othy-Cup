package handlers

import "sync"

type SessionStore struct {
	sessions map[string]int
	mu       sync.RWMutex
}

func NewSessionStore() *SessionStore {
	return &SessionStore{
		sessions: make(map[string]int),
	}
}
