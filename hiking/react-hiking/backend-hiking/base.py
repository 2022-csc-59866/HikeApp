from flask import Flask, request

#create application
app = Flask(__name__)
#fetch all data once instead of at every search invoke
hikes = []

@app.route("/search", methods=["GET"])
def search():
    #check if limit is provided and valid
    limit = 10
    if "limit" in request.args:
        try:
            limit = int(request.args["limit"])
        except ValueError:
            print("Limit provided not an integer. Custom limit ignored.")

    # process arguments
    hikes_filtered = []
    for hike in hikes:
        #check all filters
        hikes_filtered.append(hike)

        #check for limit, if reached, break early
        if len(hikes_filtered) >= int(limit):
            break

    return hikes_filtered

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)