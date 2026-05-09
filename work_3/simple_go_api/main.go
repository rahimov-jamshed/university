package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type item struct {
	Id		int
	Name	string
}

var items []item
var nxt_id = 1

func get_items(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func add_item(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")

	tmp := item{Id: nxt_id, Name: name}
	nxt_id++
	items = append(items, tmp)

	fmt.Println("Added: ", tmp.Name, " [ID: ", tmp.Id, "]")
}

func main() {
	http.HandleFunc("/items", get_items)
	http.HandleFunc("/add", add_item)

	fmt.Println("server started at http://localhost:1234")
	http.ListenAndServe(":1234", nil)
}
