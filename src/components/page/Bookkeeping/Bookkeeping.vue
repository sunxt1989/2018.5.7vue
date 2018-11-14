<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>记账凭证</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="content">
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
                        <th rowspan="2">摘要</th>
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
                            <textarea v-model="abstractArr[0].abstract" class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[0].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subjectArr[0].subject" @change="subjectChange(0)" filterable default-first-option placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.subjectCode"
                                    :value="item.subjectCode">
                                    <span style="float: left">{{ item.subjectCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectName }}</span>
                                </el-option>
                            </el-select>
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
                            <input v-model="borrowsArr[0].borrow" @change="borrowChange(0)" @mouseleave="mouseleave($event)"
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
                            <input v-model="loansArr[0].loan" @change="loanChange(0)" @mouseleave="mouseleave($event)"
                                   class="loan loanArr-1" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('0',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[1].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[1].abstract" class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[1].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subjectArr[1].subject" @change="subjectChange(1)" filterable default-first-option placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.subjectCode"
                                    :value="item.subjectCode">
                                    <span style="float: left">{{ item.subjectCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectName }}</span>
                                </el-option>
                            </el-select>
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
                            <input v-model="borrowsArr[1].borrow" @change="borrowChange(1)" @mouseleave="mouseleave($event)"
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
                            <input v-model="loansArr[1].loan" @change="loanChange(1)" @mouseleave="mouseleave($event)"
                                   class="loan loanArr-2" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('1',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[2].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[2].abstract" class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[2].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subjectArr[2].subject" @change="subjectChange(2)" filterable default-first-option placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.subjectCode"
                                    :value="item.subjectCode">
                                    <span style="float: left">{{ item.subjectCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectName }}</span>
                                </el-option>
                            </el-select>
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
                            <input v-model="borrowsArr[2].borrow" @change="borrowChange(2)" @mouseleave="mouseleave($event)"
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
                            <input v-model="loansArr[2].loan" @change="loanChange(2)" @mouseleave="mouseleave($event)"
                                   class="loan loanArr-3" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('2',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[3].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[3].abstract" class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[3].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subjectArr[3].subject" @change="subjectChange(3)" filterable default-first-option placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.subjectCode"
                                    :value="item.subjectCode">
                                    <span style="float: left">{{ item.subjectCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectName }}</span>
                                </el-option>
                            </el-select>
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
                            <input v-model="borrowsArr[3].borrow" @change="borrowChange(3)" @mouseleave="mouseleave($event)"
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
                            <input v-model="loansArr[3].loan" @change="loanChange(3)" @mouseleave="mouseleave($event)"
                                   class="loan loanArr-4" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('3',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[4].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[4].abstract" class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[4].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subjectArr[4].subject" @change="subjectChange(4)" filterable default-first-option placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.subjectCode"
                                    :value="item.subjectCode">
                                    <span style="float: left">{{ item.subjectCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectName }}</span>
                                </el-option>
                            </el-select>
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
                            <input v-model="borrowsArr[4].borrow" @change="borrowChange(4)" @mouseleave="mouseleave($event)"
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
                            <input v-model="loansArr[4].loan" @change="loanChange(4)" @mouseleave="mouseleave($event)"
                                   class="loan loanArr-5" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('4',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[5].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[5].abstract" class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[5].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subjectArr[5].subject" @change="subjectChange(5)" filterable default-first-option placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.subjectCode"
                                    :value="item.subjectCode">
                                    <span style="float: left">{{ item.subjectCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectName }}</span>
                                </el-option>
                            </el-select>
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
                            <input v-model="borrowsArr[5].borrow" @change="borrowChange(5)" @mouseleave="mouseleave($event)"
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
                            <input v-model="loansArr[5].loan" @change="loanChange(5)" @mouseleave="mouseleave($event)"
                                   class="loan loanArr-6" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('5',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[6].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[6].abstract" class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[6].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subjectArr[6].subject" @change="subjectChange(6)" filterable default-first-option placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.subjectCode"
                                    :value="item.subjectCode">
                                    <span style="float: left">{{ item.subjectCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectName }}</span>
                                </el-option>
                            </el-select>
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
                            <input v-model="borrowsArr[6].borrow" @change="borrowChange(6)" @mouseleave="mouseleave($event)"
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
                            <input v-model="loansArr[6].loan" @change="loanChange(6)" @mouseleave="mouseleave($event)"
                                   class="loan loanArr-7" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('6',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[7].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[7].abstract" class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[7].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subjectArr[7].subject" @change="subjectChange(7)" filterable default-first-option placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.subjectCode"
                                    :value="item.subjectCode">
                                    <span style="float: left">{{ item.subjectCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectName }}</span>
                                </el-option>
                            </el-select>
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
                            <input v-model="borrowsArr[7].borrow" @change="borrowChange(7)" @mouseleave="mouseleave($event)"
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
                            <input v-model="loansArr[7].loan" @change="loanChange(7)" @mouseleave="mouseleave($event)"
                                   class="loan loanArr-8" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('7',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[8].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[8].abstract" class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[8].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subjectArr[8].subject" @change="subjectChange(8)" filterable default-first-option placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.subjectCode"
                                    :value="item.subjectCode">
                                    <span style="float: left">{{ item.subjectCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectName }}</span>
                                </el-option>
                            </el-select>
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
                            <input v-model="borrowsArr[8].borrow" @change="borrowChange(8)" @mouseleave="mouseleave($event)"
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
                            <input v-model="loansArr[8].loan" @change="loanChange(8)" @mouseleave="mouseleave($event)"
                                   class="loan loanArr-9" type="text" pattern="[0-9]" maxlength="13">
                        </td>
                        <td><i @click="deleteEffective('8',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr v-show="isShowTrArr[9].isShowTr" class="effective">
                        <td class="firTd">
                            <textarea v-model="abstractArr[9].abstract" class="abstract-input" maxlength="50"></textarea>
                            <i v-show="isTrueArr[9].isTrue" class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subjectArr[9].subject" @change="subjectChange(9)" filterable default-first-option placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.subjectCode"
                                    :value="item.subjectCode">
                                    <span style="float: left">{{ item.subjectCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.subjectName }}</span>
                                </el-option>
                            </el-select>
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
                            <input v-model="borrowsArr[9].borrow" @change="borrowChange(9)" @mouseleave="mouseleave($event)"
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
                            <input v-model="loansArr[9].loan" @change="loanChange(9)" @mouseleave="mouseleave($event)"
                             class="loan loanArr-10" type="text" pattern="[0-9]" maxlength="13" >
                        </td>
                        <td><i @click="deleteEffective('9',$event)" class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    <tr class="total ">
                        <td colspan="2" class="firTd">
                            合计：<span>零元整</span>
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
                <el-button v-show="isShowAddBtn" @click="addEffective" class="add-effective" type="primary" icon="el-icon-plus">
                    新增条目
                </el-button>
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
    export default {
        data() {
            return {
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
                    {abstract:'1'},
                    {abstract:'2'},
                    {abstract:'3'},
                    {abstract:'4'},
                    {abstract:'5'},
                    {abstract:'6'},
                    {abstract:'7'},
                    {abstract:'8'},
                    {abstract:'9'},
                    {abstract:'10'},
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

                options: [],
                isShowAddBtn:true,//是否显示添加按钮
                loading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        watch:{

        },
        methods: {
            //做一个鼠标移开事件来触发change事件
            mouseleave(e){
                e.path[0].blur();
            },
            //借方金额change事件
            borrowChange(n){
                console.log(n,'borrowChange');
                let borrow = this.borrowsArr[n].borrow
                let loan = this.loansArr[n].loan
                let subject = this.subjectArr[n].subject
                if(borrow && this.borrowFun(borrow,n)){//如果变量有值时将对面变量清空，判断这条目数据是否有效
                    this.loansArr[n].loan = ''
                    this.isTrueArr[n].isTrue = subject ? true : false
                }else{//如果变量没有值时只判断条目数据是否有效
                    this.isTrueArr[n].isTrue = (subject && loan) ? true : false
                }
                this.totalChange()
            },
            loanChange(n){
                let borrow = this.borrowsArr[n].borrow
                let loan = this.loansArr[n].loan
                let subject = this.subjectArr[n].subject
                this.loanFun(loan,n);
                if(loan && this.loanFun(loan,n)){//如果变量有值时将对面变量清空，判断这条目数据是否有效
                    this.borrowsArr[n].borrow = ''
                    this.isTrueArr[n].isTrue = subject ? true : false
                }else{//如果变量没有值时只判断条目数据是否有效
                    this.isTrueArr[n].isTrue = (subject && borrow) ? true : false
                }
                this.totalChange()
            },
            //会计科目change事件
            subjectChange(n){
                let borrow = this.borrowsArr[n].borrow
                let loan = this.loansArr[n].loan;
                if(borrow || loan){
                    this.isTrueArr[n].isTrue = true;
                    this.totalChange()
                }
            },
            //删除条目
            deleteEffective(n){
                console.log(n);
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

                //将取出的条目数据全部清空删除
                isTrueArr[0].isTrue = false;
                isShowTrArr[0].isShowTr = false;
                abstractArr[0].abstract = '';
                subjectArr[0].subject = '';
                borrowsArr[0].borrow = '';
                loansArr[0].loan = '';
                borrowArr[0] = ['','','','','','','','','','',''];
                loanArr[0] = ['','','','','','','','','','',''];

                //将取出的条目放到数组的末尾
                this.isTrueArr.push(isTrueArr[0]);
                this.isShowTrArr.push(isShowTrArr[0]);
                this.abstractArr.push(abstractArr[0]);
                this.subjectArr.push(subjectArr[0]);
                this.borrowsArr.push(borrowsArr[0]);
                this.loansArr.push(loansArr[0]);
                this.borrowArr.push(borrowArr[0]);
                this.loanArr.push(loanArr[0]);

                //从新进行合计计算
                this.totalChange()
            },
            //添加条目
            addEffective(){
                let n = ''//当前添加条目的下标
                let isTrueArr = this.isTrueArr
                let isShowTrArr = this.isShowTrArr
                for(let i = 0; i < isShowTrArr.length; i++){
                    if(!isShowTrArr[i].isShowTr){
                        isShowTrArr[i].isShowTr = true
                        n = i;
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
            }
        },
        mounted(){
            // 动态设置背景图的高度为浏览器可视区域高度
            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            var topHeight = $('.top').innerHeight()
            var headerHeight = $('header').innerHeight()
//            console.log(topHeight);
//            console.log(headerHeight);
            this.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                var topHeight = $('.top').innerHeight()
                var headerHeight = $('header').innerHeight()
//                console.log(topHeight);
//                console.log(headerHeight);
                that.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
            };
        },
        created(){
            //获取tree结构的axios请求
            let url = addUrl.addUrl('subjectList')
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value;//列表数据
                    if(data.result == 1){
                        this.options = data.dataList
                    }else{
                        this.$message.error('获取列表失败，请返回重试')
                    }
                    this.loading = false;
                }).catch(error=> {
//                        console.log(error);
//                alert('网络错误，不能访问');
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
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        text-align: left;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
        text-align: center;
    }
    table tr th,td{
        border: 1px solid #ccc;
    }
    table {
        color: #333;
        font-size:18px;
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
        width:247px;
        height:63px;
        opacity: 0;
        outline: none;
        text-align: right;
        padding: 0 10px;
        font-size:20px;
    }
    table tbody tr td .borrow:hover{
        opacity: 1;
    }
    table tbody tr td .loan{
        position: absolute;
        top:0;
        right:0;
        width:247px;
        height:63px;
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

</style>
