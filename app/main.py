from flask import Blueprint, render_template

main = Blueprint("main", __name__)

@main.route("/")
def Main():
    return render_template("page_main.html")

@main.route("/get-sudoku-board", methods=['POST', 'GET'])
def getSudokuBoard():
    return{0:4, 2:6, 5:8, 6:7, 8:3, 9:8, 10:9, 11:2, 14:7, 21:4, 29:9, 34:3, 38:8, 42:6, 44:5, 49:3, 50:4, 55:8, 62:4, 67:5, 70:2, 71:9, 77:2, 78:8, 80:6}