import { Component, State, h } from "@stencil/core";
import axios from "axios";

@Component({
  tag: "agcamacho-api-key-table",
  styleUrl: "./api-key-table.scss",
  scoped: true,
})
export class ApiKeyTable {
  @State() apiKey: Date;
  @State() apiKeyCreated: string;
  @State() tableRowsObjs = [];
  @State() tableRowsEls = [];
  @State() tableRowId = 1;
  @State() generateBtnDisabled = false;
  @State() apiKeyShow: false;

  // After initial load processes
  connectedCallback() {
    let that = this;
    let token = localStorage.getItem("token");
    axios
      .get("/admin/apikey", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("get all", res);
        let apiKeysMapped = res.data.map((item) => {
          return that.onTableRowCreate(item.api_key, item.api_key_created);
        });
        this.tableRowsObjs = [...[], ...apiKeysMapped];
        this.updateTableRows();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.code);
        console.log(err.response.status);
      });
  }

  getRowObj(rowId: string) {
    return this.tableRowsObjs.filter((row) => {
      return row.rowId == rowId;
    });
  }

  onApiKeyCopy(e: Event) {
    let el = e.target as HTMLElement;
    let rowId = el.getAttribute("data-rowId");
    let rowObj = this.getRowObj(rowId);
    navigator.clipboard.writeText(rowObj[0].apiKey);
  }

  onApiKeySee(e: Event) {
    let el = e.target as HTMLElement;
    let rowId = el.getAttribute("data-rowId");
    let rowObj = this.getRowObj(rowId);
    rowObj[0].apiKeyShow = !rowObj[0].apiKeyShow;
    this.updateTableRows();
  }

  onDeleteConfirmToggle(e: Event) {
    e.preventDefault();
    let el = e.target as HTMLElement;
    let rowId = el.getAttribute("data-rowId");
    let rowObj = this.getRowObj(rowId);
    rowObj[0].deleteConfirmShow = !rowObj[0].deleteConfirmShow;
    this.updateTableRows();
  }

  updateTableRows() {
    let rowsTemp = [];
    this.tableRowsObjs.forEach((row) => {
      let newRow = (
        <tr data-rowId={row.rowId} class="api-key-table__body__row">
          <td class="api-key-table__body__row__column api-key-table__body__row__column__apikeycreated">
            {row.created}
          </td>
          <td
            class={
              "api-key-table__body__row__column api-key-table__body__row__column__apikey apikey-show-" +
              row.apiKeyShow
            }
          >
            {row.apiKeyEl}
          </td>
          <td class="api-key-table__body__row__column api-key-table__body__row__column__actions">
            <a data-rowId={row.rowId} onClick={(e) => this.onApiKeySee(e)}>
              {row.apiKeyShow ? (
                <i data-rowId={row.rowId} class="fa-solid fa-eye-slash"></i>
              ) : (
                <i data-rowId={row.rowId} class="fa-solid fa-eye"></i>
              )}
            </a>
            <a
              class="api-key-table__body__row__column__actions__copy"
              data-rowId={row.rowId}
              onClick={(e) => this.onApiKeyCopy(e)}
            >
              <i data-rowId={row.rowId} class="fa-regular fa-copy"></i>
            </a>
            <span class="delete-link">
              <a
                data-rowId={row.rowId}
                onClick={(e) => this.onDeleteConfirmToggle(e)}
              >
                <i data-rowId={row.rowId} class="fa-solid fa-trash"></i>
              </a>
              {row.deleteConfirmShow ? (
                <div class="confirm-wrapper">
                  <div class="confirm-wrapper__icon">
                    <i data-rowId={row.rowId} class="fa-solid fa-trash"></i>
                  </div>
                  <div class="confirm-wrapper__actions">
                    <span class="confirm-wrapper__actions__placeholder"></span>
                    <button
                      class="confirm-wrapper__actions__cancel"
                      data-rowId={row.rowId}
                      onClick={(e) => this.onDeleteConfirmToggle(e)}
                    >
                      Cancel
                    </button>{" "}
                    <button
                      class="confirm-wrapper__actions__confirm"
                      data-rowId={row.rowId}
                      onClick={(e) => this.onTableRowRemove(e)}
                      disabled={row.deleteConfirmBtnDisabled}
                    >
                      {row.deleteConfirmBtnDisabled ? (
                        <div>
                          <i class="fa-solid fa-spinner fa-spin"></i>
                        </div>
                      ) : (
                        <span data-rowId={row.rowId}>Confirm</span>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </span>
          </td>
        </tr>
      );
      rowsTemp.push(newRow);
    });
    this.tableRowsEls = [...[], rowsTemp];
  }

  onTableRowRemove(e: Event) {
    e.preventDefault();
    let el = e.target as HTMLElement;
    let rowId = el.getAttribute("data-rowId");
    let rowObj = this.getRowObj(rowId);
    rowObj[0].deleteConfirmBtnDisabled = true;
    this.updateTableRows();
    let token = localStorage.getItem("token");
    axios
      .delete("/admin/apikey", {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          apiKey: rowObj[0].apiKey,
        },
      })
      .then((res) => {
        this.tableRowsObjs = this.tableRowsObjs.filter((row) => {
          return row.rowId != rowId;
        });
        this.updateTableRows();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onTableRowCreate(apiKey: string, created: string) {
    let apiKeyEl = (
      <div>
        <div class="apikey-show-true">{apiKey}</div>
        <div class="apikey-show-false">
          <span class="api-key-table__body__row__column__apikey__asterisk">
            ***********************************************************
          </span>
          <span class="api-key-table__body__row__column__apikey__hint">
            {apiKey.slice(-5)}
          </span>
        </div>
      </div>
    );
    let newRow = {
      rowId: this.tableRowId,
      apiKey,
      apiKeyShow: false,
      deleteConfirmShow: false,
      deleteConfirmBtnDisabled: false,
      apiKeyEl,
      created,
    };
    ++this.tableRowId;
    return newRow;
  }

  // Generate key submit
  onGenerateApiKey(e: Event) {
    e.preventDefault();
    let that = this;
    let token = localStorage.getItem("token");
    this.generateBtnDisabled = true;
    axios
      .post(
        "/admin/apikey",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        let { apiKey, apiKeyCreated } = res.data;
        let newRow = that.onTableRowCreate(apiKey, apiKeyCreated);
        this.tableRowsObjs = [...this.tableRowsObjs, newRow];
        this.updateTableRows();
        this.generateBtnDisabled = false;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.code);
        console.log(err.response.status);
        this.generateBtnDisabled = false;
      });
  }

  // Todo: add jsx for create new password
  render() {
    return (
      <div class="api-key-table">
        <div class="api-key-table__toolbar">
          <button
            class="api-key-table__toolbar__generate button button-blue"
            disabled={this.generateBtnDisabled}
            type="submit"
            onClick={this.onGenerateApiKey.bind(this)}
          >
            {this.generateBtnDisabled ? (
              <div>
                <i class="fa-solid fa-spinner fa-spin"></i>
              </div>
            ) : (
              <span>Generate API Key</span>
            )}
          </button>
        </div>
        <table class="api-key-table__table-wrapper">
          <thead class="api-key-table__header">
            <tr>
              <th class="api-key-table__header__column api-key-table__header__column__apikeycreated">
                Created
              </th>
              <th class="api-key-table__header__column api-key-table__header__column__apikey">
                API Key
              </th>
              <th class="api-key-table__header__column api-key-table__header__column__actions">
                Actions
              </th>
            </tr>
          </thead>
          <tbody id="api-key-table__body">{this.tableRowsEls}</tbody>
        </table>
      </div>
    );
  }
}
