<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>记账凭证</h2>
                <router-link to="/" class="back">返回</router-link>
                <div class="time">
                    <span class="tit2">凭证日期:</span>
                    <el-date-picker
                        class="iptData"
                        v-model="documentDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions1"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <!--<span class="">记自第<input type="text">号</span>-->
                <!--<span>附单据<input type="text">张</span>-->
                <table>
                    <col width="300px">
                    <col width="300px">

                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">

                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <thead>
                    <tr>
                        <th rowspan="2"><span class="red">*</span>摘要</th>
                        <th rowspan="2">会计科目</th>
                        <th colspan="11">借方金额</th>
                        <th colspan="11">贷方金额</th>
                        <th rowspan="2">操作</th>
                    </tr>
                    <tr>
                        <th>亿</th>
                        <th>千</th>
                        <th>百</th>
                        <th>十</th>
                        <th>万</th>
                        <th>千</th>
                        <th>百</th>
                        <th>十</th>
                        <th>元</th>
                        <th>角</th>
                        <th>分</th>
                        <th>亿</th>
                        <th>千</th>
                        <th>百</th>
                        <th>十</th>
                        <th>万</th>
                        <th>千</th>
                        <th>百</th>
                        <th>十</th>
                        <th>元</th>
                        <th>角</th>
                        <th>分</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-show="isShowTrArr[0].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[0].abstract" @change="changeAbstract(0)" class="abstract-input" maxlength="50" ></textarea>
                            <i v-show="isTrueArr[0].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-autocomplete
                                class="chooseSubject"
                                v-model="subjectArr[0].subject"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择或输入会计科目"
                                :trigger-on-focus="false"
                                @select="subjectChange(0)">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                                <el-button slot="append" icon="el-icon-arrow-down" @click="addClick(0)"></el-button>
                            </el-autocomplete>
                            <div v-show="subjectTypeArr[0]" class="subject">
                                <el-select clearable v-model="auxiliary[0].auxiliary" placeholder="请选择辅助科目">
                                    <el-option
                                        v-for="item in auxiliaryArr"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-show="isCashFlowArr[0]" class="subject">
                                <span  class="red tips">*</span>
                                <el-select v-show="isCashFlowArr[0]" v-model="cashFlow[0].cashFlow" placeholder="请选择现金流量">
                                    <el-option
                                        v-for="item in cashFlowArr"
                                        :key="item.value"
                                        :label="item.key"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="balance">科目余额：{{balanceArr[0].balance}}元</p>
                        </td>
                        <td class="debit" :class="{red:borrowsArr[0].borrow.includes('-')}">{{borrowArr[0][0]}}</td>
                        <td class="debit" :class="{red:borrowsArr[0].borrow.includes('-')}">{{borrowArr[0][1]}}</td>
                        <td class="debit million" :class="{red:borrowsArr[0].borrow.includes('-')}">{{borrowArr[0][2]}}</td>
                        <td class="debit" :class="{red:borrowsArr[0].borrow.includes('-')}">{{borrowArr[0][3]}}</td>
                        <td class="debit" :class="{red:borrowsArr[0].borrow.includes('-')}">{{borrowArr[0][4]}}</td>
                        <td class="debit thousand" :class="{red:borrowsArr[0].borrow.includes('-')}">{{borrowArr[0][5]}}</td>
                        <td class="debit" :class="{red:borrowsArr[0].borrow.includes('-')}">{{borrowArr[0][6]}}</td>
                        <td class="debit" :class="{red:borrowsArr[0].borrow.includes('-')}">{{borrowArr[0][7]}}</td>
                        <td class="debit position" :class="{red:borrowsArr[0].borrow.includes('-')}">{{borrowArr[0][8]}}</td>
                        <td class="debit" :class="{red:borrowsArr[0].borrow.includes('-')}">{{borrowArr[0][9]}}</td>
                        <td class="debit" :class="{red:borrowsArr[0].borrow.includes('-')}">
                            {{borrowArr[0][10]}}
                            <input v-model="borrowsArr[0].borrow" @focus="inputFocus($event)" @blur="inputBlur($event)" @change="borrowChange(0)"
                                   class="borrow borrowArr-1" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][0]}}</td>
                        <td class="lender" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][1]}}</td>
                        <td class="lender million" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][2]}}</td>
                        <td class="lender" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][3]}}</td>
                        <td class="lender" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][4]}}</td>
                        <td class="lender thousand" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][5]}}</td>
                        <td class="lender" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][6]}}</td>
                        <td class="lender" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][7]}}</td>
                        <td class="lender position" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][8]}}</td>
                        <td class="lender" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][9]}}</td>
                        <td class="lender" :class="{red:loansArr[0].loan.includes('-')}">{{loanArr[0][10]}}
                            <input v-model="loansArr[0].loan" @change="loanChange(0)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="loan loanArr-1" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('0',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[1].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[1].abstract" @change="changeAbstract(1)"class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[1].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-autocomplete
                                class="chooseSubject"
                                v-model="subjectArr[1].subject"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择或输入会计科目"
                                :trigger-on-focus="false"
                                @select="subjectChange(1)">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                                <el-button slot="append" icon="el-icon-arrow-down" @click="addClick(1)"></el-button>
                            </el-autocomplete>
                            <div v-show="subjectTypeArr[1]" class="subject">
                                <el-select clearable v-model="auxiliary[1].auxiliary" placeholder="请选择辅助科目">
                                    <el-option
                                        v-for="item in auxiliaryArr"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-show="isCashFlowArr[1]" class="subject">
                                <span  class="red tips">*</span>
                                <el-select v-show="isCashFlowArr[1]" v-model="cashFlow[1].cashFlow" placeholder="请选择现金流量">
                                    <el-option
                                        v-for="item in cashFlowArr"
                                        :key="item.value"
                                        :label="item.key"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="balance">科目余额：{{balanceArr[1].balance}}元</p>
                        </td>

                        <td class="debit" :class="{red:borrowsArr[1].borrow.includes('-')}">{{borrowArr[1][0]}}</td>
                        <td class="debit" :class="{red:borrowsArr[1].borrow.includes('-')}">{{borrowArr[1][1]}}</td>
                        <td class="debit million" :class="{red:borrowsArr[1].borrow.includes('-')}">{{borrowArr[1][2]}}</td>
                        <td class="debit" :class="{red:borrowsArr[1].borrow.includes('-')}">{{borrowArr[1][3]}}</td>
                        <td class="debit" :class="{red:borrowsArr[1].borrow.includes('-')}">{{borrowArr[1][4]}}</td>
                        <td class="debit thousand" :class="{red:borrowsArr[1].borrow.includes('-')}">{{borrowArr[1][5]}}</td>
                        <td class="debit" :class="{red:borrowsArr[1].borrow.includes('-')}">{{borrowArr[1][6]}}</td>
                        <td class="debit" :class="{red:borrowsArr[1].borrow.includes('-')}">{{borrowArr[1][7]}}</td>
                        <td class="debit position" :class="{red:borrowsArr[1].borrow.includes('-')}">{{borrowArr[1][8]}}</td>
                        <td class="debit" :class="{red:borrowsArr[1].borrow.includes('-')}">{{borrowArr[1][9]}}</td>
                        <td class="debit" :class="{red:borrowsArr[1].borrow.includes('-')}">
                            {{borrowArr[1][10]}}
                            <input v-model="borrowsArr[1].borrow" @change="borrowChange(1)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="borrow borrowArr-2" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][0]}}</td>
                        <td class="lender" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][1]}}</td>
                        <td class="lender million" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][2]}}</td>
                        <td class="lender" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][3]}}</td>
                        <td class="lender" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][4]}}</td>
                        <td class="lender thousand" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][5]}}</td>
                        <td class="lender" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][6]}}</td>
                        <td class="lender" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][7]}}</td>
                        <td class="lender position" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][8]}}</td>
                        <td class="lender" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][9]}}</td>
                        <td class="lender" :class="{red:loansArr[1].loan.includes('-')}">{{loanArr[1][10]}}
                            <input v-model="loansArr[1].loan" @change="loanChange(1)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="loan loanArr-2" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('1',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[2].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[2].abstract" @change="changeAbstract(2)"class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[2].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-autocomplete
                                class="chooseSubject"
                                v-model="subjectArr[2].subject"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择或输入会计科目"
                                :trigger-on-focus="false"
                                @select="subjectChange(2)">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                                <el-button slot="append" icon="el-icon-arrow-down" @click="addClick(2)"></el-button>
                            </el-autocomplete>
                            <div v-show="subjectTypeArr[2]" class="subject">
                                <el-select clearable v-model="auxiliary[2].auxiliary" placeholder="请选择辅助科目">
                                    <el-option
                                        v-for="item in auxiliaryArr"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-show="isCashFlowArr[2]" class="subject">
                                <span  class="red tips">*</span>
                                <el-select v-show="isCashFlowArr[2]" v-model="cashFlow[2].cashFlow" placeholder="请选择现金流量">
                                    <el-option
                                        v-for="item in cashFlowArr"
                                        :key="item.value"
                                        :label="item.key"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="balance">科目余额：{{balanceArr[2].balance}}元</p>
                        </td>

                        <td class="debit" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][0]}}</td>
                        <td class="debit" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][1]}}</td>
                        <td class="debit million" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][2]}}</td>
                        <td class="debit" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][3]}}</td>
                        <td class="debit" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][4]}}</td>
                        <td class="debit thousand" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][5]}}</td>
                        <td class="debit" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][6]}}</td>
                        <td class="debit" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][7]}}</td>
                        <td class="debit position" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][8]}}</td>
                        <td class="debit" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][9]}}</td>
                        <td class="debit" :class="{red:borrowsArr[2].borrow.includes('-')}">{{borrowArr[2][10]}}
                            <input v-model="borrowsArr[2].borrow"  @change="borrowChange(2)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="borrow borrowArr-3" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][0]}}</td>
                        <td class="lender" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][1]}}</td>
                        <td class="lender million" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][2]}}</td>
                        <td class="lender" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][3]}}</td>
                        <td class="lender" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][4]}}</td>
                        <td class="lender thousand" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][5]}}</td>
                        <td class="lender" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][6]}}</td>
                        <td class="lender" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][7]}}</td>
                        <td class="lender position" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][8]}}</td>
                        <td class="lender" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][9]}}</td>
                        <td class="lender" :class="{red:loansArr[2].loan.includes('-')}">{{loanArr[2][10]}}
                            <input v-model="loansArr[2].loan" @change="loanChange(2)"@focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="loan loanArr-3" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('2',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[3].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[3].abstract" @change="changeAbstract(3)"class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[3].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-autocomplete
                                class="chooseSubject"
                                v-model="subjectArr[3].subject"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择或输入会计科目"
                                :trigger-on-focus="false"
                                @select="subjectChange(3)">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                                <el-button slot="append" icon="el-icon-arrow-down" @click="addClick(3)"></el-button>
                            </el-autocomplete>
                            <div v-show="subjectTypeArr[3]" class="subject">
                                <el-select clearable v-model="auxiliary[3].auxiliary" placeholder="请选择辅助科目">
                                    <el-option
                                        v-for="item in auxiliaryArr"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-show="isCashFlowArr[3]" class="subject">
                                <span  class="red tips">*</span>
                                <el-select v-show="isCashFlowArr[3]" v-model="cashFlow[3].cashFlow" placeholder="请选择现金流量">
                                    <el-option
                                        v-for="item in cashFlowArr"
                                        :key="item.value"
                                        :label="item.key"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="balance">科目余额：{{balanceArr[3].balance}}元</p>
                        </td>

                        <td class="debit" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][0]}}</td>
                        <td class="debit" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][1]}}</td>
                        <td class="debit million" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][2]}}</td>
                        <td class="debit" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][3]}}</td>
                        <td class="debit" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][4]}}</td>
                        <td class="debit thousand" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][5]}}</td>
                        <td class="debit" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][6]}}</td>
                        <td class="debit" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][7]}}</td>
                        <td class="debit position" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][8]}}</td>
                        <td class="debit" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][9]}}</td>
                        <td class="debit" :class="{red:borrowsArr[3].borrow.includes('-')}">{{borrowArr[3][10]}}
                            <input v-model="borrowsArr[3].borrow" @change="borrowChange(3)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="borrow borrowArr-4" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][0]}}</td>
                        <td class="lender" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][1]}}</td>
                        <td class="lender million" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][2]}}</td>
                        <td class="lender" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][3]}}</td>
                        <td class="lender" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][4]}}</td>
                        <td class="lender thousand" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][5]}}</td>
                        <td class="lender" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][6]}}</td>
                        <td class="lender" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][7]}}</td>
                        <td class="lender position" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][8]}}</td>
                        <td class="lender" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][9]}}</td>
                        <td class="lender" :class="{red:loansArr[3].loan.includes('-')}">{{loanArr[3][10]}}
                            <input v-model="loansArr[3].loan" @change="loanChange(3)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="loan loanArr-4" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('3',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[4].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[4].abstract" @change="changeAbstract(4)"class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[4].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-autocomplete
                                class="chooseSubject"
                                v-model="subjectArr[4].subject"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择或输入会计科目"
                                :trigger-on-focus="false"
                                @select="subjectChange(4)">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                                <el-button slot="append" icon="el-icon-arrow-down" @click="addClick(4)"></el-button>
                            </el-autocomplete>
                            <div v-show="subjectTypeArr[4]" class="subject">
                                <el-select clearable v-model="auxiliary[4].auxiliary" placeholder="请选择辅助科目">
                                    <el-option
                                        v-for="item in auxiliaryArr"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-show="isCashFlowArr[4]" class="subject">
                                <span  class="red tips">*</span>
                                <el-select v-show="isCashFlowArr[4]" v-model="cashFlow[4].cashFlow" placeholder="请选择现金流量">
                                    <el-option
                                        v-for="item in cashFlowArr"
                                        :key="item.value"
                                        :label="item.key"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="balance">科目余额：{{balanceArr[4].balance}}元</p>
                        </td>

                        <td class="debit" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][0]}}</td>
                        <td class="debit" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][1]}}</td>
                        <td class="debit million" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][2]}}</td>
                        <td class="debit" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][3]}}</td>
                        <td class="debit" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][4]}}</td>
                        <td class="debit thousand" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][5]}}</td>
                        <td class="debit" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][6]}}</td>
                        <td class="debit" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][7]}}</td>
                        <td class="debit position" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][8]}}</td>
                        <td class="debit" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][9]}}</td>
                        <td class="debit" :class="{red:borrowsArr[4].borrow.includes('-')}">{{borrowArr[4][10]}}
                            <input v-model="borrowsArr[4].borrow" @change="borrowChange(4)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="borrow borrowArr-5" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][0]}}</td>
                        <td class="lender" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][1]}}</td>
                        <td class="lender million" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][2]}}</td>
                        <td class="lender" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][3]}}</td>
                        <td class="lender" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][4]}}</td>
                        <td class="lender thousand" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][5]}}</td>
                        <td class="lender" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][6]}}</td>
                        <td class="lender" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][7]}}</td>
                        <td class="lender position" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][8]}}</td>
                        <td class="lender" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][9]}}</td>
                        <td class="lender" :class="{red:loansArr[4].loan.includes('-')}">{{loanArr[4][10]}}
                            <input v-model="loansArr[4].loan" @change="loanChange(4)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="loan loanArr-5" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('4',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[5].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[5].abstract" @change="changeAbstract(5)"class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[5].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-autocomplete
                                class="chooseSubject"
                                v-model="subjectArr[5].subject"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择或输入会计科目"
                                :trigger-on-focus="false"
                                @select="subjectChange(5)">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                                <el-button slot="append" icon="el-icon-arrow-down" @click="addClick(5)"></el-button>
                            </el-autocomplete>
                            <div v-show="subjectTypeArr[5]" class="subject">
                                <el-select clearable v-model="auxiliary[5].auxiliary" placeholder="请选择辅助科目">
                                    <el-option
                                        v-for="item in auxiliaryArr"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-show="isCashFlowArr[5]" class="subject">
                                <span  class="red tips">*</span>
                                <el-select v-show="isCashFlowArr[5]" v-model="cashFlow[5].cashFlow" placeholder="请选择现金流量">
                                    <el-option
                                        v-for="item in cashFlowArr"
                                        :key="item.value"
                                        :label="item.key"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="balance">科目余额：{{balanceArr[5].balance}}元</p>
                        </td>

                        <td class="debit" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][0]}}</td>
                        <td class="debit" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][1]}}</td>
                        <td class="debit million" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][2]}}</td>
                        <td class="debit" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][3]}}</td>
                        <td class="debit" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][4]}}</td>
                        <td class="debit thousand" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][5]}}</td>
                        <td class="debit" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][6]}}</td>
                        <td class="debit" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][7]}}</td>
                        <td class="debit position" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][8]}}</td>
                        <td class="debit" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][9]}}</td>
                        <td class="debit" :class="{red:borrowsArr[5].borrow.includes('-')}">{{borrowArr[5][10]}}
                            <input v-model="borrowsArr[5].borrow" @change="borrowChange(5)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="borrow borrowArr-6" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][0]}}</td>
                        <td class="lender" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][1]}}</td>
                        <td class="lender million" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][2]}}</td>
                        <td class="lender" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][3]}}</td>
                        <td class="lender" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][4]}}</td>
                        <td class="lender thousand" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][5]}}</td>
                        <td class="lender" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][6]}}</td>
                        <td class="lender" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][7]}}</td>
                        <td class="lender position" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][8]}}</td>
                        <td class="lender" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][9]}}</td>
                        <td class="lender" :class="{red:loansArr[5].loan.includes('-')}">{{loanArr[5][10]}}
                            <input v-model="loansArr[5].loan" @change="loanChange(5)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="loan loanArr-6" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('5',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[6].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[6].abstract" @change="changeAbstract(6)"class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[6].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-autocomplete
                                class="chooseSubject"
                                v-model="subjectArr[6].subject"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择或输入会计科目"
                                :trigger-on-focus="false"
                                @select="subjectChange(6)">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                                <el-button slot="append" icon="el-icon-arrow-down" @click="addClick(6)"></el-button>
                            </el-autocomplete>
                            <div v-show="subjectTypeArr[6]" class="subject">
                                <el-select clearable v-model="auxiliary[6].auxiliary" placeholder="请选择辅助科目">
                                    <el-option
                                        v-for="item in auxiliaryArr"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-show="isCashFlowArr[6]" class="subject">
                                <span  class="red tips">*</span>
                                <el-select v-show="isCashFlowArr[6]" v-model="cashFlow[6].cashFlow" placeholder="请选择现金流量">
                                    <el-option
                                        v-for="item in cashFlowArr"
                                        :key="item.value"
                                        :label="item.key"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="balance">科目余额：{{balanceArr[6].balance}}元</p>
                        </td>

                        <td class="debit" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][0]}}</td>
                        <td class="debit" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][1]}}</td>
                        <td class="debit million" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][2]}}</td>
                        <td class="debit" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][3]}}</td>
                        <td class="debit" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][4]}}</td>
                        <td class="debit thousand" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][5]}}</td>
                        <td class="debit" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][6]}}</td>
                        <td class="debit" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][7]}}</td>
                        <td class="debit position" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][8]}}</td>
                        <td class="debit" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][9]}}</td>
                        <td class="debit" :class="{red:borrowsArr[6].borrow.includes('-')}">{{borrowArr[6][10]}}
                            <input v-model="borrowsArr[6].borrow" @change="borrowChange(6)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="borrow borrowArr-7" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][0]}}</td>
                        <td class="lender" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][1]}}</td>
                        <td class="lender million" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][2]}}</td>
                        <td class="lender" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][3]}}</td>
                        <td class="lender" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][4]}}</td>
                        <td class="lender thousand" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][5]}}</td>
                        <td class="lender" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][6]}}</td>
                        <td class="lender" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][7]}}</td>
                        <td class="lender position" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][8]}}</td>
                        <td class="lender" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][9]}}</td>
                        <td class="lender" :class="{red:loansArr[6].loan.includes('-')}">{{loanArr[6][10]}}
                            <input v-model="loansArr[6].loan" @change="loanChange(6)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="loan loanArr-7" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('6',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[7].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[7].abstract" @change="changeAbstract(7)"class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[7].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-autocomplete
                                class="chooseSubject"
                                v-model="subjectArr[7].subject"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择或输入会计科目"
                                :trigger-on-focus="false"
                                @select="subjectChange(7)">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                                <el-button slot="append" icon="el-icon-arrow-down" @click="addClick(7)"></el-button>
                            </el-autocomplete>
                            <div v-show="subjectTypeArr[7]" class="subject">
                                <el-select clearable v-model="auxiliary[7].auxiliary" placeholder="请选择辅助科目">
                                    <el-option
                                        v-for="item in auxiliaryArr"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-show="isCashFlowArr[7]" class="subject">
                                <span  class="red tips">*</span>
                                <el-select v-show="isCashFlowArr[7]" v-model="cashFlow[7].cashFlow" placeholder="请选择现金流量">
                                    <el-option
                                        v-for="item in cashFlowArr"
                                        :key="item.value"
                                        :label="item.key"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="balance">科目余额：{{balanceArr[7].balance}}元</p>
                        </td>

                        <td class="debit" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][0]}}</td>
                        <td class="debit" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][1]}}</td>
                        <td class="debit million" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][2]}}</td>
                        <td class="debit" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][3]}}</td>
                        <td class="debit" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][4]}}</td>
                        <td class="debit thousand" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][5]}}</td>
                        <td class="debit" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][6]}}</td>
                        <td class="debit" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][7]}}</td>
                        <td class="debit position" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][8]}}</td>
                        <td class="debit" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][9]}}</td>
                        <td class="debit" :class="{red:borrowsArr[7].borrow.includes('-')}">{{borrowArr[7][10]}}
                            <input v-model="borrowsArr[7].borrow" @change="borrowChange(7)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="borrow borrowArr-8" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][0]}}</td>
                        <td class="lender" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][1]}}</td>
                        <td class="lender million" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][2]}}</td>
                        <td class="lender" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][3]}}</td>
                        <td class="lender" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][4]}}</td>
                        <td class="lender thousand" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][5]}}</td>
                        <td class="lender" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][6]}}</td>
                        <td class="lender" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][7]}}</td>
                        <td class="lender position" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][8]}}</td>
                        <td class="lender" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][9]}}</td>
                        <td class="lender" :class="{red:loansArr[7].loan.includes('-')}">{{loanArr[7][10]}}
                            <input v-model="loansArr[7].loan" @change="loanChange(7)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="loan loanArr-8" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('7',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[8].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[8].abstract" @change="changeAbstract(8)"class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[8].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-autocomplete
                                class="chooseSubject"
                                v-model="subjectArr[8].subject"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择或输入会计科目"
                                :trigger-on-focus="false"
                                @select="subjectChange(8)">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                                <el-button slot="append" icon="el-icon-arrow-down" @click="addClick(8)"></el-button>
                            </el-autocomplete>
                            <div v-show="subjectTypeArr[8]" class="subject">
                                <el-select clearable v-model="auxiliary[8].auxiliary" placeholder="请选择辅助科目">
                                    <el-option
                                        v-for="item in auxiliaryArr"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-show="isCashFlowArr[8]" class="subject">
                                <span  class="red tips">*</span>
                                <el-select v-show="isCashFlowArr[8]" v-model="cashFlow[8].cashFlow" placeholder="请选择现金流量">
                                    <el-option
                                        v-for="item in cashFlowArr"
                                        :key="item.value"
                                        :label="item.key"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="balance">科目余额：{{balanceArr[8].balance}}元</p>
                        </td>

                        <td class="debit" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][0]}}</td>
                        <td class="debit" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][1]}}</td>
                        <td class="debit million" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][2]}}</td>
                        <td class="debit" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][3]}}</td>
                        <td class="debit" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][4]}}</td>
                        <td class="debit thousand" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][5]}}</td>
                        <td class="debit" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][6]}}</td>
                        <td class="debit" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][7]}}</td>
                        <td class="debit position" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][8]}}</td>
                        <td class="debit" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][9]}}</td>
                        <td class="debit" :class="{red:borrowsArr[8].borrow.includes('-')}">{{borrowArr[8][10]}}
                            <input v-model="borrowsArr[8].borrow" @change="borrowChange(8)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="borrow borrowArr-9" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][0]}}</td>
                        <td class="lender" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][1]}}</td>
                        <td class="lender million" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][2]}}</td>
                        <td class="lender" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][3]}}</td>
                        <td class="lender" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][4]}}</td>
                        <td class="lender thousand" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][5]}}</td>
                        <td class="lender" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][6]}}</td>
                        <td class="lender" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][7]}}</td>
                        <td class="lender position" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][8]}}</td>
                        <td class="lender" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][9]}}</td>
                        <td class="lender" :class="{red:loansArr[8].loan.includes('-')}">{{loanArr[8][10]}}
                            <input v-model="loansArr[8].loan" @change="loanChange(8)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                                   class="loan loanArr-9" type="text" pattern="[0-9]" maxlength="13">
                        </td>
                        <td><i @click="deleteEffective('8',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[9].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[9].abstract" @change="changeAbstract(9)"class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[9].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-autocomplete
                                class="chooseSubject"
                                v-model="subjectArr[9].subject"
                                :fetch-suggestions="querySearch"
                                placeholder="请选择或输入会计科目"
                                :trigger-on-focus="false"
                                @select="subjectChange(9)">
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                                <el-button slot="append" icon="el-icon-arrow-down" @click="addClick(9)"></el-button>
                            </el-autocomplete>
                            <div v-show="subjectTypeArr[9]" class="subject">
                                <el-select clearable v-model="auxiliary[9].auxiliary" placeholder="请选择辅助科目">
                                    <el-option
                                        v-for="item in auxiliaryArr"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-show="isCashFlowArr[9]" class="subject">
                                <span  class="red tips">*</span>
                                <el-select v-show="isCashFlowArr[9]" v-model="cashFlow[9].cashFlow" placeholder="请选择现金流量">
                                    <el-option
                                        v-for="item in cashFlowArr"
                                        :key="item.value"
                                        :label="item.key"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <p class="balance">科目余额：{{balanceArr[9].balance}}元</p>
                        </td>

                        <td class="debit" :class="{red:borrowsArr[9].borrow.includes('-')}">{{borrowArr[9][0]}}</td>
                        <td class="debit" :class="{red:borrowsArr[9].borrow.includes('-')}">{{borrowArr[9][1]}}</td>
                        <td class="debit million" :class="{red:borrowsArr[9].borrow.includes('-')}">{{borrowArr[9][2]}}</td>
                        <td class="debit" :class="{red:borrowsArr[9].borrow.includes('-')}">{{borrowArr[9][3]}}</td>
                        <td class="debit" :class="{red:borrowsArr[9].borrow.includes('-')}">{{borrowArr[9][4]}}</td>
                        <td class="debit thousand" :class="{red:borrowsArr[9].borrow.includes('-')}">{{borrowArr[9][5]}}</td>
                        <td class="debit" :class="{red:borrowsArr[9].borrow.includes('-')}">{{borrowArr[9][6]}}</td>
                        <td class="debit" :class="{red:borrowsArr[9].borrow.includes('-')}">{{borrowArr[9][7]}}</td>
                        <td class="debit position" :class="{red:borrowsArr[9].borrow.includes('-')}">{{borrowArr[9][8]}}</td>
                        <td class="debit" :class="{red:borrowsArr[9].borrow.includes('-')}">{{borrowArr[9][9]}}</td>
                        <td class="debit" :class="{red:borrowsArr[9].borrow.includes('-')}" >{{borrowArr[9][10]}}
                            <input v-model="borrowsArr[9].borrow" @change="borrowChange(9)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                             class="borrow borrowArr-10" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][0]}}</td>
                        <td class="lender" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][1]}}</td>
                        <td class="lender million" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][2]}}</td>
                        <td class="lender" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][3]}}</td>
                        <td class="lender" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][4]}}</td>
                        <td class="lender thousand" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][5]}}</td>
                        <td class="lender" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][6]}}</td>
                        <td class="lender" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][7]}}</td>
                        <td class="lender position" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][8]}}</td>
                        <td class="lender" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][9]}}</td>
                        <td class="lender" :class="{red:loansArr[9].loan.includes('-')}">{{loanArr[9][10]}}
                            <input v-model="loansArr[9].loan" @change="loanChange(9)" @focus="inputFocus($event)" @blur="inputBlur($event)"
                             class="loan loanArr-10" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('9',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr class="total ">
                        <td colspan="2" class="firTd">
                            合计：
                        </td>
                        <td class="debit" :class="{red:borrowTotal.includes('-')}">{{totalArr[0]}}</td>
                        <td class="debit" :class="{red:borrowTotal.includes('-')}">{{totalArr[1]}}</td>
                        <td class="debit million" :class="{red:borrowTotal.includes('-')}">{{totalArr[2]}}</td>
                        <td class="debit" :class="{red:borrowTotal.includes('-')}">{{totalArr[3]}}</td>
                        <td class="debit" :class="{red:borrowTotal.includes('-')}">{{totalArr[4]}}</td>
                        <td class="debit thousand" :class="{red:borrowTotal.includes('-')}">{{totalArr[5]}}</td>
                        <td class="debit" :class="{red:borrowTotal.includes('-')}">{{totalArr[6]}}</td>
                        <td class="debit" :class="{red:borrowTotal.includes('-')}">{{totalArr[7]}}</td>
                        <td class="debit position" :class="{red:borrowTotal.includes('-')}">{{totalArr[8]}}</td>
                        <td class="debit" :class="{red:borrowTotal.includes('-')}">{{totalArr[9]}}</td>
                        <td class="debit" :class="{red:borrowTotal.includes('-')}" >{{totalArr[10]}}
                        </td>

                        <td class="lender" :class="{red:loanTotal.includes('-')}">{{totalArr[11]}}</td>
                        <td class="lender" :class="{red:loanTotal.includes('-')}">{{totalArr[12]}}</td>
                        <td class="lender million" :class="{red:loanTotal.includes('-')}">{{totalArr[13]}}</td>
                        <td class="lender" :class="{red:loanTotal.includes('-')}">{{totalArr[14]}}</td>
                        <td class="lender" :class="{red:loanTotal.includes('-')}">{{totalArr[15]}}</td>
                        <td class="lender thousand" :class="{red:loanTotal.includes('-')}">{{totalArr[16]}}</td>
                        <td class="lender" :class="{red:loanTotal.includes('-')}">{{totalArr[17]}}</td>
                        <td class="lender" :class="{red:loanTotal.includes('-')}">{{totalArr[18]}}</td>
                        <td class="lender position" :class="{red:loanTotal.includes('-')}">{{totalArr[19]}}</td>
                        <td class="lender" :class="{red:loanTotal.includes('-')}">{{totalArr[20]}}</td>
                        <td class="lender" :class="{red:loanTotal.includes('-')}">{{totalArr[21]}}
                        </td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>

                <el-dialog title="科目区间" :visible.sync="dialogTableVisible" showConfirmButton="true" top="20px">
                    <el-tabs v-if="current_account_standard == 1" v-model="classSubject" type="card" @tab-click="clickSubject">
                        <el-tab-pane label="资产" name="1">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree1" :props="defaultProps"
                                         ref="Tree1"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck1">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="负债" name="2">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree2" :props="defaultProps"
                                         ref="Tree2"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck2">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="权益" name="3">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree3" :props="defaultProps"
                                         ref="Tree3"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck3">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="成本" name="4">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree4" :props="defaultProps"
                                         ref="Tree4"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck4">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="损益" name="5">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree5" :props="defaultProps"
                                         ref="Tree5"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck5">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <el-tabs v-if="current_account_standard == 2" v-model="classSubject" type="card" @tab-click="clickSubject">
                        <el-tab-pane label="资产" name="1">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree1" :props="defaultProps"
                                         ref="Tree1"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck1">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="负债" name="2">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree2" :props="defaultProps"
                                         ref="Tree2"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck2">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="共同类" name="3">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree3" :props="defaultProps"
                                         ref="Tree3"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck3">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="权益" name="4">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree4" :props="defaultProps"
                                         ref="Tree4"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck4">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="成本" name="5">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree5" :props="defaultProps"
                                         ref="Tree5"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck5">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="损益" name="6">
                            <div class="Tree" :style="{height:treeHeight}">
                                <el-tree :data="tree6" :props="defaultProps"
                                         ref="Tree6"
                                         default-expand-all
                                         check-on-click-node
                                         show-checkbox
                                         check-strictly
                                         node-key="name"
                                         @check="clickCheck6">
                                </el-tree>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <el-button @click="treeSave" class="treeSave" size="small" type="primary">保存</el-button>
                </el-dialog>

                <el-button v-show="isShowAddBtn" @click="addEffective" class="add-effective" type="primary" icon="el-icon-plus">
                    新增条目
                </el-button>
                <el-button :loading="isLoading" @click="save" class="save">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import addUrl from '../../../../static/js/addUrl'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                restaurants:[],//tree结构
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                auxiliaryArr:[],//辅助科目列表
                cashFlowArr:[],//现金流量列表
                nowAbstract:'',//摘要公共变量
                documentDate:'',
                isTrueArr:[
                    {isTrue:false},
                    {isTrue:false},
                    {isTrue:false},
                    {isTrue:false},
                    {isTrue:false},
                    {isTrue:false},
                    {isTrue:false},
                    {isTrue:false},
                    {isTrue:false},
                    {isTrue:false},
                ],//条目是否有效
                isShowTrArr:[
                    {isShowTr:true},
                    {isShowTr:true},
                    {isShowTr:true},
                    {isShowTr:false},
                    {isShowTr:false},
                    {isShowTr:false},
                    {isShowTr:false},
                    {isShowTr:false},
                    {isShowTr:false},
                    {isShowTr:false},
                ],//是否显示条目
                abstractArr:[
                    {abstract:''},
                    {abstract:''},
                    {abstract:''},
                    {abstract:''},
                    {abstract:''},
                    {abstract:''},
                    {abstract:''},
                    {abstract:''},
                    {abstract:''},
                    {abstract:''},
                ],//摘要
                subjectArr:[
                    {subject:''},
                    {subject:''},
                    {subject:''},
                    {subject:''},
                    {subject:''},
                    {subject:''},
                    {subject:''},
                    {subject:''},
                    {subject:''},
                    {subject:''},
                ],//会计科目
                balanceArr:[
                    {balance:'0.00'},
                    {balance:'0.00'},
                    {balance:'0.00'},
                    {balance:'0.00'},
                    {balance:'0.00'},
                    {balance:'0.00'},
                    {balance:'0.00'},
                    {balance:'0.00'},
                    {balance:'0.00'},
                    {balance:'0.00'},
                ],//科目余额
                borrowsArr:[
                    {borrow:''},
                    {borrow:''},
                    {borrow:''},
                    {borrow:''},
                    {borrow:''},
                    {borrow:''},
                    {borrow:''},
                    {borrow:''},
                    {borrow:''},
                    {borrow:''},
                ],//借方金额
                loansArr:[
                    {loan:''},
                    {loan:''},
                    {loan:''},
                    {loan:''},
                    {loan:''},
                    {loan:''},
                    {loan:''},
                    {loan:''},
                    {loan:''},
                    {loan:''},
                ],//贷方金额
                borrowArr:[
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                ],//借方金额数组
                loanArr:[
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                    ['','','','','','','','','','',''],
                ],//贷方金额数组
                borrowTotal:'',//借方合计
                loanTotal:'',//贷方合计
                totalArr:['','','','','','','','','','','','','','','','','','','','','',''],//合计数组
                isCashFlowArr:[false,false,false,false,false,false,false,false,false,false],//是否显示现金流量
                subjectTypeArr:[false,false,false,false,false,false,false,false,false,false],//是否显示辅助科目
                auxiliary:[
                    {auxiliary:''},
                    {auxiliary:''},
                    {auxiliary:''},
                    {auxiliary:''},
                    {auxiliary:''},
                    {auxiliary:''},
                    {auxiliary:''},
                    {auxiliary:''},
                    {auxiliary:''},
                    {auxiliary:''},
                ],//辅助科目
                cashFlow:[
                    {cashFlow:''},
                    {cashFlow:''},
                    {cashFlow:''},
                    {cashFlow:''},
                    {cashFlow:''},
                    {cashFlow:''},
                    {cashFlow:''},
                    {cashFlow:''},
                    {cashFlow:''},
                    {cashFlow:''},
                ],//现金流量

                n:'',//当前打开的是第几行科目
                classSubject:'1',//科目选择分类
                tree1: [],//资产
                tree2: [],//负债
                tree3: [],//共同类
                tree4: [],//权益
                tree5: [],//成本
                tree6: [],//损益
                treeHeight: '', //tree高度
                dialogTableVisible:false,//新建明细模态框是否显示
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                options: [],
                isLoading:false,
                isShowAddBtn:true,//是否显示添加按钮
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        computed:{
            ...mapState({
                current_account_standard:state => state.current_account_standard,
            }),
        },
        methods: {
            //会计科目模糊查询事件
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            //输入金额input框获取，失去焦点事件，当获取焦点时显示input框，当失去焦点时隐藏input框
            inputFocus(e){
                $(e.target).css('opacity',1)
            },
            //输入金额input框获取，失去焦点事件，当获取焦点时显示input框，当失去焦点时隐藏input框
            inputBlur(e){
                $(e.target).css('opacity',0)
            },
            //切换科目区间选项时触发事件，请求axios获取新的tree
            clickSubject(){
                this.loading = true;
                this.treeAxios(this.classSubject)
                if(this.classSubject == 1){
                    this.$refs.Tree1.setCheckedKeys([]);
                }else if(this.classSubject == 2){
                    this.$refs.Tree2.setCheckedKeys([]);
                }else if(this.classSubject == 3){
                    this.$refs.Tree3.setCheckedKeys([]);
                }else if(this.classSubject == 4){
                    this.$refs.Tree4.setCheckedKeys([]);
                }else if(this.classSubject == 5){
                    this.$refs.Tree5.setCheckedKeys([]);
                }else if(this.classSubject == 6){
                    this.$refs.Tree6.setCheckedKeys([]);
                }
            },
            //科目选择保存按钮
            treeSave(){
                let subject = ''
                if(this.classSubject == '1'){
                    subject = (this.$refs.Tree1.getCheckedKeys()[0] == undefined)? '':parseInt(this.$refs.Tree1.getCheckedKeys()[0])
                }else if(this.classSubject == '2'){
                    subject = (this.$refs.Tree2.getCheckedKeys()[0] == undefined)?'': parseInt(this.$refs.Tree2.getCheckedKeys()[0])
                }else if(this.classSubject == '3'){
                    subject = (this.$refs.Tree3.getCheckedKeys()[0] == undefined)?'': parseInt(this.$refs.Tree3.getCheckedKeys()[0])
                }else if(this.classSubject == '4'){
                    subject = (this.$refs.Tree4.getCheckedKeys()[0] == undefined)?'': parseInt(this.$refs.Tree4.getCheckedKeys()[0])
                }else if(this.classSubject == '5'){
                    subject = (this.$refs.Tree5.getCheckedKeys()[0] == undefined)?'': parseInt(this.$refs.Tree5.getCheckedKeys()[0])
                }else if(this.classSubject == '6'){
                    subject = (this.$refs.Tree6.getCheckedKeys()[0] == undefined)?'': parseInt(this.$refs.Tree6.getCheckedKeys()[0])
                }

                this.subjectArr[this.n].subject = String(subject)
                this.dialogTableVisible = false;
                this.subjectChange(this.n)

            },
            //将tree结构的复选框调整为radio状态
            clickCheck1(data,checkedKeys){
                //判断，如果checkedKeys.checkedKeys.length == 0 时说明点击的为已选框，则将勾选取消。否则，仅将点击的框赋值勾选，而其他已勾选的框取消。
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree1.setCheckedKeys([]);
                }else{
                    this.$refs.Tree1.setCheckedKeys([data.name]);
                }

            },
            clickCheck2(data,checkedKeys){
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree2.setCheckedKeys([]);
                }else {
                    this.$refs.Tree2.setCheckedKeys([data.name]);
                }
            },
            clickCheck3(data,checkedKeys){
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree3.setCheckedKeys([]);
                }else {
                    this.$refs.Tree3.setCheckedKeys([data.name]);
                }
            },
            clickCheck4(data,checkedKeys){
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree4.setCheckedKeys([]);
                }else {
                    this.$refs.Tree4.setCheckedKeys([data.name]);
                }
            },
            clickCheck5(data,checkedKeys){
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree5.setCheckedKeys([]);
                }else {
                    this.$refs.Tree5.setCheckedKeys([data.name]);
                }
            },
            clickCheck6(data,checkedKeys){
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree6.setCheckedKeys([]);
                }else {
                    this.$refs.Tree6.setCheckedKeys([data.name]);
                }
            },

            //获取tree结构的axios请求
            treeAxios(n){
                let url = addUrl.addUrl('tree')
                let params = new URLSearchParams();
                params.append('type',n);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let data = response.data.value;//列表数据
//                        console.log(data);
                        if(n == 1){
                            this.tree1 = data.zNodes
                        }else if(n == 2){
                            this.tree2 = data.zNodes
                        }else if(n == 3){
                            this.tree3 = data.zNodes
                        }else if(n == 4){
                            this.tree4 = data.zNodes
                        }else if(n == 5){
                            this.tree5 = data.zNodes
                        }else if(n == 6){
                            this.tree6 = data.zNodes
                        }
                        this.loading = false;
                    })
                    .catch(error=> {
//                        console.log(error);
                        alert('网络错误，不能访问');
                        this.loading = false;
                    })
            },
            //打开科目区间选择模态框
            addClick(n){
                this.n = n
                this.dialogTableVisible = true;
                this.loading = true
                this.treeAxios(1)
            },
            //关闭模态框的回调函数
            closeDialog(done){
                this.$refs.Tree.setCheckedKeys([]);
                done();
            },
            //做一个鼠标移开事件来触发change事件
            //借方金额change事件
            borrowChange(n){
                let borrow = this.borrowsArr[n].borrow;//当前行借款金额
                if(borrow && this.borrowFun(borrow,n)){//如果变量有值时将对面变量清空，判断这条目数据是否有效
                    this.loansArr[n].loan = ''
                }else{//如果变量没有值时只判断条目数据是否有效
                    this.borrowsArr[n].borrow = '';
                    this.borrowArr[n] = ['','','','','','','','','','',''];
                    Vue.set(this.borrowArr,n,this.borrowArr[n])
                }
                this.changeIsTrue()
            },
            loanChange(n){
                let loan = this.loansArr[n].loan;//当前行贷款金额

                this.loanFun(loan,n);
                if(loan && this.loanFun(loan,n)){//如果变量有值时将对面变量清空，判断这条目数据是否有效
                    this.borrowsArr[n].borrow = ''
                }else{//如果变量没有值时只判断条目数据是否有效
                    this.loansArr[n].loan = ''
                    this.loanArr[n] = ['','','','','','','','','','',''];
                }
                this.changeIsTrue()
            },

            //会计科目change事件
            subjectChange(n){
                let subject = this.subjectArr[n].subject
                //判断会计科目修改是否为空
                if(subject){
                    if (this.documentDate) {
                        this.balance(n)
                    } else {
                        this.$message.error('请选择凭证日期')
                        this.subjectArr[n].subject = ''
                        Vue.set(this.subjectArr, n, this.subjectArr[n])
                        return
                    }
                    let borrow = this.borrowsArr[n].borrow
                    let loan = this.loansArr[n].loan;
                    if (borrow || loan) {
                        this.changeIsTrue()
                    }
                }else{
                    this.changeIsTrue()
                }

            },
            //删除条目
            deleteEffective(n){
                this.isShowAddBtn = true; //让新增条目按钮出现

                //将删除的条目从数组中取出
                let isTrueArr = this.isTrueArr.splice(n, 1);
                let isShowTrArr = this.isShowTrArr.splice(n, 1);
                let abstractArr = this.abstractArr.splice(n, 1);
                let subjectArr = this.subjectArr.splice(n, 1);
                let borrowsArr = this.borrowsArr.splice(n, 1);
                let loansArr = this.loansArr.splice(n, 1);
                let borrowArr = this.borrowArr.splice(n, 1);
                let loanArr = this.loanArr.splice(n, 1);
                let auxiliary = this.auxiliary.splice(n, 1);
                let cashFlow = this.cashFlow.splice(n, 1);
                let isCashFlowArr = this.isCashFlowArr.splice(n, 1);
                let subjectTypeArr = this.subjectTypeArr.splice(n, 1);

                //将取出的条目数据全部清空删除
                isTrueArr[0].isTrue = false;
                isShowTrArr[0].isShowTr = false;
                abstractArr[0].abstract = '';
                subjectArr[0].subject = '';
                borrowsArr[0].borrow = '';
                loansArr[0].loan = '';
                borrowArr[0] = ['','','','','','','','','','',''];
                loanArr[0] = ['','','','','','','','','','',''];
                auxiliary[0].auxiliary = '';
                cashFlow[0].cashFlow = '';
                subjectTypeArr[0] = false;
                isCashFlowArr[0] = false;

                //将取出的条目放到数组的末尾
                this.isTrueArr.push(isTrueArr[0]);
                this.isShowTrArr.push(isShowTrArr[0]);
                this.abstractArr.push(abstractArr[0]);
                this.subjectArr.push(subjectArr[0]);
                this.borrowsArr.push(borrowsArr[0]);
                this.loansArr.push(loansArr[0]);
                this.borrowArr.push(borrowArr[0]);
                this.loanArr.push(loanArr[0]);
                this.auxiliary.push(auxiliary[0]);
                this.cashFlow.push(cashFlow[0]);
                this.subjectTypeArr.push(cashFlow[0]);
                this.isCashFlowArr.push(cashFlow[0]);

                //从新进行合计计算
                this.totalChange()
            },
            //添加条目
            addEffective(){
                let isShowTrArr = this.isShowTrArr
                let abstractArr = this.abstractArr
                for(let i = 0; i < isShowTrArr.length; i++){
                    if(!isShowTrArr[i].isShowTr){
                        isShowTrArr[i].isShowTr = true
                        abstractArr[i].abstract = this.nowAbstract
                        this.isShowAddBtn = isShowTrArr.find((val) => val.isShowTr == false) ? true : false //循环判断当十个条目都为true时，则隐藏添加按钮
                        return
                    }
                }
            },
            //计算合计方法
            totalChange(){
//                console.log('走了');
                let borrowTotalVal = 0
                let loanTotalVal = 0
                for(let i = 0; i < this.isTrueArr.length; i++){
                    borrowTotalVal += (this.isTrueArr[i].isTrue && this.borrowsArr[i].borrow) ? Number(this.borrowsArr[i].borrow) : 0
                    loanTotalVal += (this.isTrueArr[i].isTrue && this.loansArr[i].loan) ? Number(this.loansArr[i].loan) : 0
                }

                borrowTotalVal = String(borrowTotalVal)
                loanTotalVal = String(loanTotalVal)
                this.borrowTotal = borrowTotalVal
                this.loanTotal = loanTotalVal

                let borrowNowVal = ''//借方val值
                let borrowIntegerArr = [];//借方整数部分数组
                let borrowDecimalArr = [];//借方小数部分数组

                let loanNowVal = ''//贷方val值
                let loanIntegerArr = [];//贷方整数部分数组
                let loanDecimalArr = [];//贷方小数部分数组

                //借方金额数组赋值
                borrowNowVal = borrowTotalVal.includes('-') ? borrowTotalVal.split('-').join('') : borrowTotalVal //先将val去负号
                borrowIntegerArr = borrowNowVal.split('.')[0]//获取整数部分
                borrowDecimalArr = borrowNowVal.split('.')[1]//获取小数部分
                if(borrowIntegerArr != 0){
                    borrowIntegerArr = borrowIntegerArr.split('').reverse() //将整数部分转成数组并顺序反转
                    for(let i = 0 ; i < 9; i++){
                        this.totalArr[8 - i] = borrowIntegerArr[i] ? borrowIntegerArr[i] : 0 //对每一位赋值，如果没有则补0
                    }
                }else{
                    //整数部分全部补0
                    for(let i = 0 ; i < 9; i++){
                        this.totalArr[8 - i] = 0
                    }
                }

                if(borrowDecimalArr){//判断是否有小数部分
                    borrowDecimalArr = borrowDecimalArr.split('') //将小数部分转成数组
                    this.totalArr[9] = borrowDecimalArr[0] ? borrowDecimalArr[0] : 0
                    this.totalArr[10] = borrowDecimalArr[1] ? borrowDecimalArr[1] : 0
                }else{
                    this.totalArr[9] = 0
                    this.totalArr[10] = 0
                }

                //贷方金额数组赋值
                loanNowVal = loanTotalVal.includes('-') ? loanTotalVal.split('-').join('') : loanTotalVal //先将val去负号
                loanIntegerArr = loanNowVal.split('.')[0]//获取整数部分
                loanDecimalArr = loanNowVal.split('.')[1]//获取小数部分
                if(loanIntegerArr != 0){
                    loanIntegerArr = loanIntegerArr.split('').reverse() //将整数部分转成数组并顺序反转
                    for(let i = 0 ; i < 9; i++){
                        this.totalArr[19 - i] = loanIntegerArr[i] ? loanIntegerArr[i] : 0 //对每一位赋值，如果没有则补0
                    }
                }else{
                    //整数部分全部补0
                    for(let i = 0 ; i < 9; i++){
                        this.totalArr[19 - i] = 0
                    }
                }

                if(loanDecimalArr){//判断是否有小数部分
                    loanDecimalArr = loanDecimalArr.split('') //将小数部分转成数组
                    this.totalArr[20] = loanDecimalArr[0] ? loanDecimalArr[0] : 0
                    this.totalArr[21] = loanDecimalArr[1] ? loanDecimalArr[1] : 0
                }else{
                    this.totalArr[20] = 0
                    this.totalArr[21] = 0
                }

            },
            //借方金额显示方法
            borrowFun(val,n){//val：金额 ，n：第几行参数
                let str = /^-?[0-9]+(\.[0-9]{1,2})?$/;
                let nowVal = ''
                let integerArr = [];//整数部分数组
                let decimalArr = [];//小数部分数组

                if(str.test(val)){ //判定输入的金额是否正确
                    nowVal = val.includes('-') ? val.split('-').join('') : val //先将val去负号
                    integerArr = nowVal.split('.')[0] //获取整数部分
                    decimalArr = nowVal.split('.')[1]//获取小数部分
                    if(integerArr != 0){
                        integerArr = integerArr.split('').reverse() //将整数部分转成数组并顺序反转
                        for(let i = 0 ; i < 9; i++){
                            this.borrowArr[n][8 - i] = integerArr[i] ? integerArr[i] : 0 //对每一位赋值，如果没有则补0
                        }
                    }else{
                        //整数部分全部补0
                        for(let i = 0 ; i < 9; i++){
                            this.borrowArr[n][8 - i] = 0
                        }
                    }

                    if(decimalArr){//判断是否有小数部分
                        decimalArr = decimalArr.split('') //将小数部分转成数组
                        this.borrowArr[n][9] = decimalArr[0] ? decimalArr[0] : 0
                        this.borrowArr[n][10] = decimalArr[1] ? decimalArr[1] : 0
                    }else{
                        this.borrowArr[n][9] = 0
                        this.borrowArr[n][10] = 0
                    }
                    Vue.set(this.borrowArr,n,this.borrowArr[n]);//为了从新赋值时model能够实时刷新数据
                    this.loanArr[n] =  ['','','','','','','','','','','']//清除对面金额（借贷只能选择一方填写
                    return true
                }else{
                    this.borrowArr[n] =  ['','','','','','','','','','','']
                    return false
                }
            },
            //贷方金额显示方法
            loanFun(val,n){
                let str = /^-?[0-9]+(\.[0-9]{1,2})?$/;
                let nowVal = ''
                let integerArr = [];//整数部分数组
                let decimalArr = [];//小数部分数组

                if(str.test(val)){ //判定输入的金额是否正确
                    nowVal = val.includes('-') ? val.split('-').join('') : val //先将val去负号
                    integerArr = nowVal.split('.')[0] //获取整数部分
                    decimalArr = nowVal.split('.')[1]//获取小数部分
                    if(integerArr != 0){
                        integerArr = integerArr.split('').reverse() //将整数部分转成数组并顺序反转
                        for(let i = 0 ; i < 9; i++){
                            this.loanArr[n][8 - i] = integerArr[i] ? integerArr[i] : 0 //对每一位赋值，如果没有则补0
                        }
                    }else{
                        //整数部分全部补0
                        for(let i = 0 ; i < 9; i++){
                            this.loanArr[n][8 - i] = 0
                        }
                    }

                    if(decimalArr){//判断是否有小数部分
                        decimalArr = decimalArr.split('') //将小数部分转成数组
                        this.loanArr[n][9] = decimalArr[0] ? decimalArr[0] : 0
                        this.loanArr[n][10] = decimalArr[1] ? decimalArr[1] : 0
                    }else{
                        this.loanArr[n][9] = 0
                        this.loanArr[n][10] = 0
                    }
                    Vue.set(this.loanArr,n,this.loanArr[n]);//为了从新赋值时model能够实时刷新数据
                    this.borrowArr[n] =  ['','','','','','','','','','','']//清除对面金额（借贷只能选择一方填写）
                    return true
                }else{
                    this.loanArr[n] =  ['','','','','','','','','','','']
                    return false
                }
            },
            //保存按钮事件
            save(){
                let isTrueArr = [];
                if(this.documentDate == ''){
                    this.$message.error('请选择凭证日期');
                    return
                }
                for(let i in this.isTrueArr){
                    isTrueArr.push(this.isTrueArr[i].isTrue)
                }
                if(!isTrueArr.includes(true)){
                    this.$message.error('请至少填写一条有效条目');
                    return
                }else{
                    this.isLoading = true;
                    this.$confirm('确定是否保存？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        showClose: false,
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: 'warning',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                instance.confirmButtonLoading = true;
                                instance.cancelButtonLoading = true;
                                instance.confirmButtonText = '执行中...';
                                setTimeout(() => {
                                    done();
                                    setTimeout(() => {
                                        instance.confirmButtonLoading = false;
                                        instance.cancelButtonLoading = false;
                                    }, 300);
                                }, 300);
                            } else {
                                done();
                            }
                        }
                    }).then(() => {
                        this.loading = true;
                        this.saveAjax(isTrueArr)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false;
                        this.isLoading = false;
                    });
                }
            },
            //保存接口
            saveAjax(isTrueArr){
                let certificateArr = [];
                let certificateString = '';
                for(let i = 0; i < isTrueArr.length; i++){
                    let obj = {}
                    if(isTrueArr[i]){
                        obj.subjectCode = this.subjectArr[i].subject
                        obj.remark = this.abstractArr[i].abstract
                        obj.debitAmout = this.borrowsArr[i].borrow
                        obj.creditAmout = this.loansArr[i].loan
                        obj.cashFlowNo = this.cashFlow[i].cashFlow
                        obj.relationId = this.auxiliary[i].auxiliary
                        certificateArr.push(obj)
                    }
                };
                certificateString = JSON.stringify(certificateArr);
                let params = new URLSearchParams();
                let url = addUrl.addUrl('certificateSave')
                params.append('date',this.documentDate);
                params.append('certificateString',certificateString);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let msg = response.data.msg
                        if(response.data.status == 200){
                            this.$message.success('记账成功');
                            this.documentDate = ''
                                this.isTrueArr = [
                                {isTrue:false},
                                {isTrue:false},
                                {isTrue:false},
                                {isTrue:false},
                                {isTrue:false},
                                {isTrue:false},
                                {isTrue:false},
                                {isTrue:false},
                                {isTrue:false},
                                {isTrue:false},
                            ]//条目是否有效
                                this.isShowTrArr = [
                                    {isShowTr:true},
                                    {isShowTr:true},
                                    {isShowTr:true},
                                    {isShowTr:false},
                                    {isShowTr:false},
                                    {isShowTr:false},
                                    {isShowTr:false},
                                    {isShowTr:false},
                                    {isShowTr:false},
                                    {isShowTr:false}
                                ]//是否显示条目
                                this.abstractArr = [
                                {abstract:''},
                                {abstract:''},
                                {abstract:''},
                                {abstract:''},
                                {abstract:''},
                                {abstract:''},
                                {abstract:''},
                                {abstract:''},
                                {abstract:''},
                                {abstract:''},
                            ]//摘要
                                this.subjectArr = [
                                {subject:''},
                                {subject:''},
                                {subject:''},
                                {subject:''},
                                {subject:''},
                                {subject:''},
                                {subject:''},
                                {subject:''},
                                {subject:''},
                                {subject:''},
                            ]//会计科目
                                this.balanceArr = [
                                {balance:'0.00'},
                                {balance:'0.00'},
                                {balance:'0.00'},
                                {balance:'0.00'},
                                {balance:'0.00'},
                                {balance:'0.00'},
                                {balance:'0.00'},
                                {balance:'0.00'},
                                {balance:'0.00'},
                                {balance:'0.00'},
                            ]//科目余额
                                this.borrowsArr = [
                                {borrow:''},
                                {borrow:''},
                                {borrow:''},
                                {borrow:''},
                                {borrow:''},
                                {borrow:''},
                                {borrow:''},
                                {borrow:''},
                                {borrow:''},
                                {borrow:''},
                            ]//借方金额
                                this.loansArr = [
                                {loan:''},
                                {loan:''},
                                {loan:''},
                                {loan:''},
                                {loan:''},
                                {loan:''},
                                {loan:''},
                                {loan:''},
                                {loan:''},
                                {loan:''},
                            ]//贷方金额
                                this.borrowArr = [
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                            ]//借方金额数组
                                this.loanArr = [
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                                ['','','','','','','','','','',''],
                            ]//贷方金额数组
                                this.borrowTotal = ''//借方合计
                                this.loanTotal = ''//贷方合计
                                this.totalArr = ['','','','','','','','','','','','','','','','','','','','','','']//合计数组
                                this.isCashFlowArr = [false,false,false,false,false,false,false,false,false,false]//是否显示现金流量
                                this.subjectTypeArr = [false,false,false,false,false,false,false,false,false,false]//是否显示辅助科目
                                this.auxiliary = [
                                    {auxiliary:''},
                                    {auxiliary:''},
                                    {auxiliary:''},
                                    {auxiliary:''},
                                    {auxiliary:''},
                                    {auxiliary:''},
                                    {auxiliary:''},
                                    {auxiliary:''},
                                    {auxiliary:''},
                                    {auxiliary:''},
                                ]//辅助科目
                                this.cashFlow = [
                                    {cashFlow:''},
                                    {cashFlow:''},
                                    {cashFlow:''},
                                    {cashFlow:''},
                                    {cashFlow:''},
                                    {cashFlow:''},
                                    {cashFlow:''},
                                    {cashFlow:''},
                                    {cashFlow:''},
                                    {cashFlow:''},
                                ]//现金流量
                        }else if(response.data.status == 400){
                            this.$message.error(msg)
                        }
                        this.loading = false;
                        this.isLoading = false;
                    }).catch(error=> {
//                        console.log(error);
//                alert('网络错误，不能访问');
                    this.loading = false;
                    this.isLoading = false;
                })
            },
            //获取科目余额接口
            balance(n){
                //获取tree结构的axios请求
                let params = new URLSearchParams();
                let url = addUrl.addUrl('balance')
                params.append('date',this.documentDate);
                params.append('subjectCode',this.subjectArr[n].subject);
                axios.post(url,params)
                    .then(response=> {
                        console.log(response);
                        let status = response.data.status;
                        let data = response.data.value;//列表数据
                        let msg = response.data.msg
                        if(status == 200){
                            this.balanceArr[n].balance = number.number(data.amount)
                            this.auxiliaryArr = data.relationList
                            Vue.set(this.balanceArr,n,this.balanceArr[n])
                            this.isCashFlowArr[n] = data.isCashFlow > 0 ? true : false
                            this.subjectTypeArr[n] = data.subjectType > 0 ? true : false
                            this.cashFlow[n].cashFlow = '';
                            this.auxiliary[n].auxiliary = '';
                        }else if(status == 400){
                            this.$message.error(msg);
                            this.isCashFlowArr[n] = false
                            this.subjectTypeArr[n] = false
                            this.balanceArr[n].balance = '0.00'
                            this.subjectArr[n].subject = ''
                            Vue.set(this.isCashFlowArr,n,this.isCashFlowArr[n])
                            Vue.set(this.subjectTypeArr,n,this.subjectTypeArr[n])
                            Vue.set(this.balanceArr,n,this.balanceArr[n])
                            Vue.set(this.subjectArr,n,this.subjectArr[n])
                        }
                        this.changeIsTrue()
                        this.loading = false;
                    }).catch(error=> {
//                        console.log(error);
//                alert('网络错误，不能访问');
                    this.loading = false;
                })
            },
            //摘要change事件
            changeAbstract(n){
                this.nowAbstract = this.abstractArr[n].abstract;//保存当前摘要变量
                this.pushAbstract(n);//将当前摘要赋值给所有没有值的行中
            },
            pushAbstract(){
                let isShowTrArr = this.isShowTrArr
                let abstractArr = this.abstractArr
                for(let i in isShowTrArr){
                    if(isShowTrArr[i].isShowTr && abstractArr[i].abstract == '')abstractArr[i].abstract = this.nowAbstract
                    if(i == isShowTrArr.length - 1){
                        this.changeIsTrue()
                    }
                }
            },
            //判断该行必填项是否都填正确
            changeIsTrue(){
                for(let i in this.borrowsArr){
                    let borrow = this.borrowsArr[i].borrow;//当前行借款金额
                    let loan = this.loansArr[i].loan;//当前行贷款金额
                    let subject = this.subjectArr[i].subject;//当前行会计科目
                    let abstract = this.abstractArr[i].abstract;//摘要
                    this.isTrueArr[i].isTrue = (borrow || loan) && subject && abstract ? true : false;
                }
                //从新进行合计计算
                this.totalChange()
            },
        },
        mounted(){
            // 动态设置背景图的高度为浏览器可视区域高度
            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            var topHeight = $('.top').innerHeight()
            var headerHeight = $('header').innerHeight()
//            console.log(topHeight);
//            console.log(headerHeight);
            this.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
            this.treeHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 220}px`;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                var topHeight = $('.top').innerHeight()
                var headerHeight = $('header').innerHeight()
//                console.log(topHeight);
//                console.log(headerHeight);
                that.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
                that.treeHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 220}px`;
            };


        },
        created(){
            let nowDate = new Date();//当前日期
            let nowYear = nowDate.getFullYear()
            let nowMonth = (nowDate.getMonth()+1) < 10 ? '0' + (nowDate.getMonth()+1) : (nowDate.getMonth()+1)
            let nowDates = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
            let documentDate = nowYear + '-' + nowMonth + '-' + nowDates;

            this.documentDate = documentDate
            if(this.current_account_standard == 2){
                this.cashFlowArr = [
                    {
                        key:'销售商品、提供劳务收到的现金',
                        value:'CF1'
                    },
                    {
                        key:'收到的税费返还',
                        value:'CF2'
                    },
                    {
                        key:'收到其他与经营活动有关的现金',
                        value:'CF3'
                    },  {
                        key:'购买商品、接受劳务支付的现金',
                        value:'CF4'
                    },  {
                        key:'支付给职工以及为职工支付的现金',
                        value:'CF5'
                    },
                    {
                        key:'支付的各项税费',
                        value:'CF6'
                    },
                    {
                        key:'支付其他与经营活动有关的现金',
                        value:'CF7'
                    },
                    {
                        key:'收回投资收到的现金',
                        value:'CF8'
                    },
                    {
                        key:'取得投资收益收到的现金',
                        value:'CF9'
                    },
                    {
                        key:'处置固定资产、无形资产和其他长期资产收回的现金净额',
                        value:'CF10'
                    },{
                        key:'处置子公司及其他营业单位收到的现金净额',
                        value:'CF11'
                    },
                    {
                        key:'收到其他与投资活动有关的现金',
                        value:'CF12'
                    },{
                        key:'购建固定资产、无形资产和其他长期资产支付的现金',
                        value:'CF13'
                    },
                    {
                        key:'投资支付的现金',
                        value:'CF14'
                    },
                    {
                        key:'取得子公司及其他营业单位支付的现金净额',
                        value:'CF15'
                    },
                    {
                        key:'支付其他与投资活动有关的现金',
                        value:'CF16'
                    },
                    {
                        key:'吸收投资收到的现金',
                        value:'CF17'
                    },
                    {
                        key:'取得借款收到的现金',
                        value:'CF18'
                    },
                    {
                        key:'收到其他与筹资活动有关的现金',
                        value:'CF19'
                    },
                    {
                        key:'偿还债务支付的现金',
                        value:'CF20'
                    },
                    {
                        key:'分配股利、利润或偿付利息支付的现金',
                        value:'CF21'
                    },
                    {
                        key:'支付其他与筹资活动有关的现金',
                        value:'CF22'
                    },
                ];
            }else{
                this.cashFlowArr = [
                    {
                        key:'销售产成品、商品、提供劳务收到的现金',
                        value:'CF1'
                    },
                    {
                        key:'收到其他与经营活动有关的现金',
                        value:'CF2'
                    },
                    {
                        key:'购买原材料、商品、接受劳务支付的现金',
                        value:'CF3'
                    },  {
                        key:'支付的职工薪酬',
                        value:'CF4'
                    },  {
                        key:'支付的税费',
                        value:'CF5'
                    },
                    {
                        key:'支付其他与经营活动有关的现金',
                        value:'CF6'
                    },
                    {
                        key:'收回短期投资、长期债券投资和长期股权投资收到的现金',
                        value:'CF7'
                    },
                    {
                        key:'取得投资收益收到的现金',
                        value:'CF8'
                    },
                    {
                        key:'处置固定资产、无形资产和其他非流动资产收回的现金净额',
                        value:'CF9'
                    },
                    {
                        key:'短期投资、长期债券投资和长期股权投资支付的现金',
                        value:'CF10'
                    },{
                        key:'购建固定资产、无形资产和其他非流动资产支付的现金',
                        value:'CF11'
                    },
                    {
                        key:'取得借款收到的现金',
                        value:'CF12'
                    },{
                        key:'吸收投资者投资收到的现金',
                        value:'CF13'
                    },
                    {
                        key:'偿还借款本金支付的现金',
                        value:'CF14'
                    },
                    {
                        key:'偿还借款利息支付的现金',
                        value:'CF15'
                    },
                    {
                        key:'分配利润支付的现金',
                        value:'CF16'
                    }
                ];
            }
            this.treeAxios()

            let url = addUrl.addUrl('tree')
            let params = new URLSearchParams();
            params.append('type','0');
            axios.post(url,params)
                .then(response=> {
//                        console.log(response);
                    let data = response.data.value;//列表数据
                    this.restaurants = data.zNodes
                    for(let i in this.restaurants){
                        this.restaurants[i].value = String(parseInt(this.restaurants[i].name))
                    }
                    this.loading = false;
                }).catch(error=> {
//                        console.log(error);
                alert('网络错误，不能访问');
                this.loading = false;
            })
        },
    }
</script>

<style scoped>
    .w{
        height:100%;
    }
    .top {
        margin: 20px 0;
        text-align: center;
        position: relative;
    }
    h2 {
        display: inline-block;
    }
    .back{
        display: inline-block;
        width:56px;
        height:30px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size:14px;
        text-decoration: none;
        color: #333;
        position: absolute;
        right: 30px;
    }
    .time {
        position: absolute;
        top:0px;
        left: 30px;
    }
    .time .tit2{
        font-size:18px;
    }
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        text-align: left;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }

    table tr th,td{
        border: 1px solid #ccc;
    }
    table {
        color: #333;
        font-size:18px;
        margin-top: 20px;
    }
    table tr th,td {
        vertical-align: middle;
        font-weight: 500;
        padding: 5px 0px;
        text-align: center;
    }
    table tbody .effective {
        height:60px;
    }
    table tr td .abstract-input{
        display: inline-block;
        width:90%;
        height:48px;
        resize: none;
        border: none;
        outline: none;
    }
    table .iconfont{
       margin: 0;
       cursor: pointer;
    }
    table tbody tr .firTd{
        position: relative;
    }
    table tbody tr td .subject{
        display: inline-block;
        width:240px;
        margin-top: 10px;
        position: relative;
    }
    table tbody tr td .tips{
        position: absolute;
        top:8px;
        left:-2px;
    }
    table tbody tr td .balance{
        display: inline-block;
        width:240px;
        font-size:16px;
        text-align: left;
    }
    table tbody tr td .icon-31xuanze{
        display: inline-block;
        position: absolute;
        top:25px;
        left:-30px;
        font-size:20px;
    }
    table tbody tr td .green{
        color: #48d41f;
    }
    table tbody tr .debit{
        position: relative;
    }
    table tbody tr .lender{
        position: relative;
    }
    table tbody tr td .borrow{
        position: absolute;
        top:0;
        right:0;
        width:240px;
        height:98%;
        opacity: 0;
        outline: none;
        text-align: right;
        padding: 0 10px;
        font-size:20px;
    }
    /*table tbody tr td .borrow:hover{*/
        /*opacity: 1;*/
    /*}*/
    table tbody tr td .loan{
        position: absolute;
        top:0;
        right:0;
        width:240px;
        height:98%;
        opacity: 0;
        outline: none;
        text-align: right;
        padding: 0 10px;
        font-size:20px;
    }
    table tbody tr td .loan:hover{
        opacity: 1;
    }
    table tbody tr .million{
        border-right: 2px solid #a5d9f7;
    }
    table tbody tr .thousand{
        border-right: 2px solid #a5d9f7;
    }
    table tbody tr .position{
        border-right: 2px solid #efbbb9;
    }
    .content .add-effective{
        margin-top: 50px;
    }
    .content .save{
        margin-top: 50px;
    }
    .Tree{
        height:450px;
        overflow: auto;
    }
    .treeSave{
        width:80px;
        margin-top: 10px;
        margin-left: 30px;
    }
    .effective .chooseSubject{
        width:240px;
    }
</style>
